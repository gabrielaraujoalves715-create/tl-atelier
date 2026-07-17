import { ImagePlaceholder } from './ImagePlaceholder';

export default function VideoSection() {
  return (
    <section id="videos" className="py-16 border-b border-brand-soft-rose/10 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-sans text-2xl sm:text-3xl font-light text-neutral-900 leading-tight tracking-wide">
            Descubra cada detalhe em vídeo
          </h2>
          <div className="h-[1px] w-12 bg-[#F472B6]/40 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-full max-w-[280px]">
              <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
                <ImagePlaceholder className="w-full h-full" label="Adicionar vídeo" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

