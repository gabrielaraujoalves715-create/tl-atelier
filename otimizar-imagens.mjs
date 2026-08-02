import sharp from 'sharp';
import path from 'node:path';
import {
  access,
  readFile,
  stat,
  writeFile,
} from 'node:fs/promises';

const existe = async (arquivo) => {
  try {
    await access(arquivo);
    return true;
  } catch {
    return false;
  }
};

const formatarTamanho = (bytes) =>
  `${(bytes / 1024).toFixed(1)} KB`;

// Encontra automaticamente as imagens principais dos produtos
const productsSource = await readFile(
  'src/data/products.ts',
  'utf8',
);

const productImages = [
  ...new Set(
    [...productsSource.matchAll(/\bimage:\s*'\/([^']+)'/g)]
      .map((match) => match[1]),
  ),
];

const grupos = [
  {
    nome: 'cards de produtos',
    arquivos: productImages,
    sufixo: 'card',
    larguras: [360, 640],
    qualidade: 72,
  },
  {
    nome: 'categorias',
    arquivos: [
      'colecao-colares.webp',
      'colecao-pulseiras.webp',
      'colecao-brincos.webp',
      'colecao-conjuntos.webp',
      'colecao-aneis.webp',
    ],
    sufixo: 'thumb',
    larguras: [200, 320],
    qualidade: 70,
  },
  {
    nome: 'editorial',
    arquivos: [
      'brinco-trio.webp',
      'colar-letra.webp',
      'editorial-pulseira-gota-pov.webp',
      'colar.webp',
    ],
    sufixo: 'editorial',
    larguras: [480, 800],
    qualidade: 72,
  },
  {
    nome: 'logotipo',
    arquivos: ['logo-tl-atelier.png'],
    sufixo: 'logo',
    larguras: [260, 400],
    qualidade: 82,
  },
];

for (const grupo of grupos) {
  console.log(`\nGerando ${grupo.nome}:`);

  for (const arquivo of grupo.arquivos) {
    const input = path.join('public', arquivo);

    if (!(await existe(input))) {
      console.warn(`Arquivo não encontrado: ${input}`);
      continue;
    }

    const parsed = path.parse(arquivo);

    for (const largura of grupo.larguras) {
      const outputName =
        `${parsed.name}-${grupo.sufixo}-${largura}.webp`;

      const output = path.join(
        'public',
        parsed.dir,
        outputName,
      );

      const imagem = await sharp(input)
        .rotate()
        .resize({
          width: largura,
          withoutEnlargement: true,
        })
        .webp({
          quality: grupo.qualidade,
          effort: 6,
          smartSubsample: true,
        })
        .toBuffer();

      await writeFile(output, imagem);

      const informacoes = await stat(output);

      console.log(
        `${output} → ${formatarTamanho(informacoes.size)}`,
      );
    }
  }
}

console.log('\nOtimização concluída.');