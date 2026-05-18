// Stub for the `picomatch` package — the real one is CJS-only and
// incompatible with the Cloudflare workerd dev runtime. It's pulled in
// transitively by @astrojs/react -> @astrojs/internal-helpers/create-filter,
// which is imported by @astrojs/react/dist/server.js but only invoked when
// the react() integration receives include/exclude options. We pass none,
// so the function is never called — it only needs to be importable as ESM.
// TODO: Remove once @astrojs/internal-helpers ships an ESM-only matcher
// or moves create-filter behind dynamic import.
function picomatch() {
  return () => false;
}
picomatch.scan = () => ({ tokens: [], parts: [] });
picomatch.parse = () => ({});
picomatch.makeRe = () => /(?:)/;
picomatch.compileRe = () => /(?:)/;
picomatch.toRegex = () => /(?:)/;
picomatch.test = () => ({ isMatch: false });
picomatch.matchBase = () => false;
picomatch.isMatch = () => false;

export default picomatch;
