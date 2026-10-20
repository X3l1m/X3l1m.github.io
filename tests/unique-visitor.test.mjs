import assert from "node:assert/strict";
import test from "node:test";
import { recordUniqueVisitor } from "../src/lib/unique-visitor.ts";

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

function createBrowser(storage = createStorage()) {
  const requests = [];
  return {
    storage,
    locks: navigator.locks,
    send: async (url) => {
      requests.push(new URL(url));
    },
    requests,
  };
}

test("first visit sends one site-wide count without an identifier", async () => {
  const browser = createBrowser();
  await recordUniqueVisitor(browser);

  assert.equal(browser.requests.length, 1);
  const url = browser.requests[0];
  assert.equal(url.origin, "https://x3l1m.goatcounter.com");
  assert.equal(url.pathname, "/count");
  assert.equal(url.searchParams.get("p"), "/");
  assert.equal(url.searchParams.get("ns"), "true");
  assert.deepEqual([...url.searchParams.keys()].sort(), ["ns", "p", "rnd", "t"]);
});

test("reloads, later visits and main/beta deployments share one count", async () => {
  const browser = createBrowser();
  await recordUniqueVisitor(browser);
  await recordUniqueVisitor(browser);

  // Recreate the client as on a reload or a new deploy, retaining browser storage.
  const newTab = createBrowser(browser.storage);
  await recordUniqueVisitor(newTab);
  assert.equal(browser.requests.length + newTab.requests.length, 1);
});

test("simultaneous tabs use the real Web Locks API to send one request", async () => {
  const sharedStorage = createStorage();
  const tabs = Array.from({ length: 20 }, () => createBrowser(sharedStorage));
  await Promise.all(tabs.map(recordUniqueVisitor));

  assert.equal(tabs.reduce((total, tab) => total + tab.requests.length, 0), 1);
});

test("separate browser storage counts separately", async () => {
  const firstBrowser = createBrowser();
  const secondBrowser = createBrowser();
  await Promise.all([
    recordUniqueVisitor(firstBrowser),
    recordUniqueVisitor(secondBrowser),
  ]);
  assert.equal(firstBrowser.requests.length, 1);
  assert.equal(secondBrowser.requests.length, 1);
});

test("a lost response is not retried and cannot double count on reload", async () => {
  const browser = createBrowser();
  let attempts = 0;
  const send = async () => {
    attempts++;
    throw new Error("Connection lost after the server may have counted it");
  };

  await recordUniqueVisitor({ ...browser, send });
  await recordUniqueVisitor({ ...browser, send });
  assert.equal(attempts, 1);
});

test("blocked storage never sends a request or breaks the page", async () => {
  for (const failingMethod of ["getItem", "setItem"]) {
    const browser = createBrowser();
    browser.storage[failingMethod] = () => {
      throw new Error("Storage denied");
    };
    await recordUniqueVisitor(browser);
    assert.equal(browser.requests.length, 0);
  }
});

test("unsupported or denied locks do not fall back to unsafe counting", async () => {
  const browser = createBrowser();
  await recordUniqueVisitor({ ...browser, locks: undefined });
  await recordUniqueVisitor({
    ...browser,
    locks: { request: async () => { throw new Error("Locks denied"); } },
  });
  assert.equal(browser.requests.length, 0);
});
