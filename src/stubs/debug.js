// Stub for the `debug` package — the real one is CJS-only and
// incompatible with the Cloudflare workerd runtime used in dev.
// TODO: Remove this stub (and the resolve alias in astro.config.mjs) once
// astro-icon ships an ESM-compatible build or drops the `debug` dependency.
// Upstream: https://github.com/natemoo-re/astro-icon/issues
export default function debug() {
  const noop = () => {};
  noop.enabled = false;
  noop.extend = debug;
  noop.log = noop;
  noop.destroy = noop;
  noop.enable = noop;
  noop.disable = noop;
  return noop;
}
export { debug };
