/**
 * Common Indonesian / Sunda honorific prefixes that appear BEFORE the given name.
 * These should be skipped when extracting the first "real" name word.
 *
 * Examples:
 *   "Hj. Lilis Suryani"     → "Lilis"
 *   "dr. Rendi Purnama Aji" → "Rendi"
 *   "H. Asep Saepudin"      → "Asep"
 *   "Prof. Dr. Budi Santoso" → "Budi"
 */
const HONORIFIC_PREFIXES = new Set([
  // Islamic titles
  "H.", "Hj.", "KH.", "K.H.", "Ust.", "Ustadz", "Ustadzah",
  // Academic / professional
  "dr.", "Dr.", "Drs.", "Drh.", "drh.", "Drg.", "drg.",
  "Apt.", "apt.", "Ir.", "Prof.", "S.H.", "S.E.",
  // Nobility / traditional
  "R.", "Rd.", "Raden", "Ny.",
  // General salutations (when used as prefix)
  "Bp.", "Bpk.", "Ibu", "Haji", "Hajah", "M.",
]);

/**
 * Returns the first "real" given name word, skipping any leading honorific prefixes.
 *
 * @example
 * getFirstName("Hj. Lilis Suryani, S.E., M.M.")  // → "Lilis"
 * getFirstName("dr. Rendi Purnama Aji, Sp.JP.")   // → "Rendi"
 * getFirstName("H. Asep Saepudin, S.T.")           // → "Asep"
 * getFirstName("Farhan Maulana Yusuf, S.Kom.")     // → "Farhan"
 */
export function getFirstName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  for (const part of parts) {
    // Strip trailing commas (e.g. "Yusuf," before "S.Kom.")
    const clean = part.replace(/,.*$/, "").trim();
    if (clean && !HONORIFIC_PREFIXES.has(clean)) {
      return clean;
    }
  }
  // Fallback: return whatever the first word is
  return (parts[0] ?? "").replace(/,.*$/, "");
}

/**
 * Returns the uppercase initial of the first "real" given name.
 *
 * @example
 * getInitial("Hj. Lilis Suryani")  // → "L"
 * getInitial("dr. Rendi Purnama")  // → "R"
 */
export function getInitial(fullName: string): string {
  const first = getFirstName(fullName);
  return (first[0] ?? "?").toUpperCase();
}
