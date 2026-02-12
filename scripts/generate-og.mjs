import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const fraunces = readFileSync(
  join(root, "node_modules/@fontsource/fraunces/files/fraunces-latin-700-normal.woff"),
);
const inter = readFileSync(
  join(root, "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"),
);

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#2f3a52",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              fontFamily: "Fraunces",
              fontSize: 72,
              color: "#f6f4ee",
              lineHeight: 1.2,
            },
            children: "Graham Wright",
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontFamily: "Inter",
              fontSize: 32,
              color: "#c8c4ba",
              marginTop: 16,
            },
            children: "gtw.dev",
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Fraunces", data: fraunces, style: "normal" },
      { name: "Inter", data: inter, style: "normal" },
    ],
  },
);

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
const png = resvg.render().asPng();

const out = join(root, "public/og-default.png");
writeFileSync(out, png);
console.log(`Wrote ${out} (${png.byteLength} bytes)`);
