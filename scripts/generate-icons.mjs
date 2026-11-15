// Gera os ícones a partir de src/app/icon.svg. Uso: node scripts/generate-icons.mjs
// Usa o sharp que já vem instalado com o Next (nenhuma dependência nova).
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync("src/app/icon.svg");
const png = (size) => sharp(svg, { density: 72 * (size / 64) * 4 }).resize(size, size).png().toBuffer();

writeFileSync("src/app/apple-icon.png", await png(180));
writeFileSync("public/icon-192.png", await png(192));
writeFileSync("public/icon-512.png", await png(512));

// favicon.ico: contêiner ICO com dois PNGs embutidos (16 e 32 px)
const sizes = [16, 32];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2); // tipo: ícone
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); // largura
  e.writeUInt8(sizes[i], 1); // altura
  e.writeUInt16LE(1, 4); // planos
  e.writeUInt16LE(32, 6); // bits por pixel
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
console.log("ícones gerados");
