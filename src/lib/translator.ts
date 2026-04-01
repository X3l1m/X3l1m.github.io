/**
 * Auto-translation layer powered by Google Translate (unofficial client API).
 * No API key required — uses the same endpoint as translate.google.com.
 * Language list is fetched from the Lingva API with a hardcoded fallback.
 *
 * - Translates all strings in batches of 5 (joined by delimiter)
 * - Aggressively caches results in localStorage
 * - Falls back to English silently on any error
 */

const CACHE_VERSION = "v2";

export type LangOption = { code: string; name: string };

// ─── storage ────────────────────────────────────────────────────────────────

function store(): Storage | null {
  return typeof window !== "undefined" ? localStorage : null;
}

// ─── language list ──────────────────────────────────────────────────────────

/**
 * Comprehensive list of languages supported by Google Translate.
 * Used as the primary source (and as a fallback if the API fails).
 */
const FALLBACK_LANGUAGES: LangOption[] = [
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "as", name: "Assamese" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "bm", name: "Bambara" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bho", name: "Bhojpuri" },
  { code: "bs", name: "Bosnian" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "dv", name: "Dhivehi" },
  { code: "doi", name: "Dogri" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "ee", name: "Ewe" },
  { code: "fil", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "ilo", name: "Ilocano" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "gom", name: "Konkani" },
  { code: "ko", name: "Korean" },
  { code: "kri", name: "Krio" },
  { code: "ku", name: "Kurdish (Kurmanji)" },
  { code: "ckb", name: "Kurdish (Sorani)" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "ln", name: "Lingala" },
  { code: "lt", name: "Lithuanian" },
  { code: "lg", name: "Luganda" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mai", name: "Maithili" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mni-Mtei", name: "Meitei (Manipuri)" },
  { code: "lus", name: "Mizo" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "ny", name: "Nyanja (Chichewa)" },
  { code: "or", name: "Odia (Oriya)" },
  { code: "om", name: "Oromo" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "qu", name: "Quechua" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sm", name: "Samoan" },
  { code: "sa", name: "Sanskrit" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "nso", name: "Sepedi" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tl", name: "Tagalog (Filipino)" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu" },
  { code: "th", name: "Thai" },
  { code: "ti", name: "Tigrinya" },
  { code: "ts", name: "Tsonga" },
  { code: "tr", name: "Turkish" },
  { code: "tk", name: "Turkmen" },
  { code: "ak", name: "Twi (Akan)" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek" },
  { code: "vi", name: "Vietnamese" },
  { code: "cy", name: "Welsh" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
].sort((a, b) => a.name.localeCompare(b.name));

/**
 * Returns the list of supported languages.
 * Cached in localStorage so it's only computed once.
 */
export async function getLanguages(): Promise<LangOption[]> {
  const cacheKey = `lgv_langs_${CACHE_VERSION}`;
  const cached = store()?.getItem(cacheKey);
  if (cached) return JSON.parse(cached) as LangOption[];

  store()?.setItem(cacheKey, JSON.stringify(FALLBACK_LANGUAGES));
  return FALLBACK_LANGUAGES;
}

// ─── translation ─────────────────────────────────────────────────────────────

/**
 * Translates a single text using Google Translate's unofficial API.
 * Groups multiple strings with a delimiter to reduce request count.
 */
async function gtranslate(texts: string[], target: string): Promise<string[]> {
  const DELIM = " ||| ";
  const joined = texts.join(DELIM);
  const url =
    `https://translate.googleapis.com/translate_a/single` +
    `?client=gtx&sl=en&tl=${encodeURIComponent(target)}&dt=t` +
    `&q=${encodeURIComponent(joined)}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // Response: [[["translated chunk","original chunk",...], ...], ...]
  const data = (await res.json()) as Array<Array<[string, string]>>;
  const translatedJoined = data[0].map((chunk) => chunk[0]).join("");

  // Split back on the delimiter (Google may modify spacing slightly)
  const parts = translatedJoined.split(/\s*\|\|\|\s*/);
  // If split count doesn't match, fall back to returning the whole string repeated
  if (parts.length !== texts.length) return texts;
  return parts;
}

/**
 * Translates every value in `source` from English to `target`.
 * Results are cached in localStorage keyed by language code + version.
 * Falls back to the English value for any string that fails.
 */
export async function translateStrings(
  source: Record<string, string>,
  target: string
): Promise<Record<string, string>> {
  if (target === "en") return source;

  const cacheKey = `lgv_t_${CACHE_VERSION}_${target}`;
  const cached = store()?.getItem(cacheKey);
  if (cached) return JSON.parse(cached) as Record<string, string>;

  const entries = Object.entries(source);
  const keys = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  // Process in batches of 5 strings per request
  const BATCH = 5;
  const translated: string[] = new Array(values.length);

  for (let i = 0; i < values.length; i += BATCH) {
    const batchValues = values.slice(i, i + BATCH);
    try {
      const results = await gtranslate(batchValues, target);
      results.forEach((r, j) => {
        translated[i + j] = r;
      });
    } catch {
      // Fall back to English for this batch
      batchValues.forEach((v, j) => {
        translated[i + j] = v;
      });
    }
  }

  const result = Object.fromEntries(keys.map((k, i) => [k, translated[i]]));
  store()?.setItem(cacheKey, JSON.stringify(result));
  return result;
}
