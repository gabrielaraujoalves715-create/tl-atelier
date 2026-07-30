import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const pastaPublic = path.resolve('public');
const extensoesPermitidas = ['.jpg', '.webp', '..webp'];

async function converterPasta(pasta) {
  const arquivos = fs.readdirSync(pasta, { withFileTypes: true });

  for (const arquivo of arquivos) {
    const caminhoOriginal = path.join(pasta, arquivo.name);

    if (arquivo.isDirectory()) {
      await converterPasta(caminhoOriginal);
      continue;
    }

    const extensao = path.extname(arquivo.name).toLowerCase();

    if (!extensoesPermitidas.includes(extensao)) {
      continue;
    }

    const caminhoWebp = caminhoOriginal.replace(
      /\.(jpg|jpeg|.webp)$/i,
      '.webp',
    );

    await sharp(caminhoOriginal)
      .rotate()
      .webp({ quality: 82 })
      .toFile(caminhoWebp);

    console.log(`Convertida: ${arquivo.name}`);
  }
}

await converterPasta(pastaPublic);

console.log('Todas as imagens foram convertidas para WebP.');