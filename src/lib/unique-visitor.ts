const COUNTER_ENDPOINT = "https://x3l1m.goatcounter.com/count";

// Keep this key stable across deployments. It represents this counter, not a release.
const VISITOR_KEY = "portfolio:unique-visitor:x3l1m.goatcounter.com";

type VisitorCounter = {
  storage: Pick<Storage, "getItem" | "setItem">;
  locks?: Pick<LockManager, "request">;
  send: (url: string) => Promise<unknown>;
};

export async function recordUniqueVisitor({
  storage,
  locks,
  send,
}: VisitorCounter): Promise<void> {
  // Without a cross-tab lock, skipping is safer than counting concurrent tabs twice.
  if (!locks) return;

  try {
    const firstVisit = await locks.request(VISITOR_KEY, () => {
      try {
        if (storage.getItem(VISITOR_KEY) !== null) return false;

        // Claim before sending: closing/reloading a tab must not send another request.
        // We deliberately do not retry ambiguous network failures to avoid duplicates.
        storage.setItem(VISITOR_KEY, "1");
        return true;
      } catch {
        return false;
      }
    });

    if (!firstVisit) return;

    const url = new URL(COUNTER_ENDPOINT);
    url.searchParams.set("p", "/");
    url.searchParams.set("t", "Unique browser visitors");
    // Deduplication is handled locally; don't merge separate browsers sharing an IP.
    url.searchParams.set("ns", "true");
    url.searchParams.set("rnd", Math.random().toString(36).slice(2));
    await send(url.href);
  } catch {
    // Blocked storage, unavailable locks or analytics must never break the portfolio.
  }
}
