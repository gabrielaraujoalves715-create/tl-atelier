import sharp from 'sharp';
import {
  access,
  stat,
  writeFile,
} from 'node:fs/promises';

const imagens = [
  {
    input: 'public/colar-infinito-prata-925.png',
    output: 'public/colar-infinito-prata-925.webp',
    width: 800,
  },
  {
    input: 'public/anel-riviera.webp',
    output: 'public/anel-riviera.webp',
    width: 800,
  },
  {
    input: 'public/colecao-conjuntos.png',
    output: 'public/colecao-conjuntos.webp',
    width: 500,
  },
  {
    input: 'public/colar-ponto-de-luz-lilas-02.png',
    output: 'public/colar-ponto-de-luz-lilas-02.webp',
    width: 800,
  },
  {
    input: 'public/editorial-pulseira-gota-pov.webp',
    output: 'public/editorial-pulseira-gota-pov.webp',
    width: 900,
  },
  {
    input: 'public/colar-cristal.webp',
    output: 'public/colar-cristal.webp',
    width: 800,
  },
  {
    input: 'public/conjunto-bolinhas-prata-925.png',
    output: 'public/conjunto-bolinhas-prata-925.webp',
    width: 800,
  },
  {
    input: 'public/colar-filho-1-menino.webp',
    output: 'public/colar-filho-1-menino.webp',
    width: 800,
  },
];

const arquivoExiste = async (caminho) => {
  try {
    await access(caminho);
    return true;
  } catch {
    return false;
  }
};

const formatarTamanho = (bytes) =>
  `${(bytes / 1024).toFixed(1)} KB`;

for (const imagem of imagens) {
  if (!(await arquivoExiste(imagem.input))) {
    console.warn(`Arquivo não encontrado: ${imagem.input}`);
    continue;
  }

  const imagemOtimizada = await sharp(imagem.input)
    .rotate()
    .resize({
      width: imagem.width,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
      effort: 5,
    })
    .toBuffer();

  await writeFile(imagem.output, imagemOtimizada);

  const informacoes = await stat(imagem.output);

  console.log(
    `${imagem.output} -> ${formatarTamanho(informacoes.size)}`,
  );
}

console.log('Otimização concluída.');