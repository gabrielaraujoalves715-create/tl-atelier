import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type TestimonialImage = {
  src: string;
  alt: string;
};

export default function Testimonials() {
  const [selectedImage, setSelectedImage] =
    useState<TestimonialImage | null>(null);

  const testimonials: TestimonialImage[] = [
    {
      src: '/depoimento-1.jpeg',
      alt: 'Depoimento de cliente da TL Atelier',
    },
    {
      src: '/depoimento-2.jpeg',
      alt: 'Avaliação de cliente da TL Atelier',
    },
    {
      src: '/depoimento-3.jpeg',
      alt: 'Feedback de cliente da TL Atelier',
    },
  ];

  useEffect(() => {
    if (!selectedImage) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  return (
    <>
      <section
        id="depoimentos"
        className="
          border-b border-brand-soft-rose/20
          bg-brand-main
          py-16 sm:py-20
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">

            <h2
  className="
    font-serif
    text-[30px]
    font-medium
    leading-[1.15]
    tracking-[-0.02em]
    text-brand-text
    sm:text-[38px]
    md:text-[42px]
  "
>
  O que dizem sobre nós
</h2>

            <p
              className="
                mt-3
                text-xs uppercase tracking-widest
                text-brand-text/50
              "
            >
              A experiência de quem escolheu a TL Atelier
            </p>

            <div
              className="
                mx-auto mt-5
                h-px w-12
                bg-brand-dark-rose/40
              "
            />
          </div>

          {/* Depoimentos */}
          <div
            className="
              flex snap-x snap-mandatory gap-4
              overflow-x-auto pb-4
              md:grid md:grid-cols-3
              md:gap-6 md:overflow-visible md:pb-0
              lg:gap-8
            "
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.src}
                type="button"
                onClick={() => setSelectedImage(testimonial)}
                aria-label={`Ampliar depoimento ${index + 1}`}
                className="
                  group
                  min-w-[84%] snap-center
                  overflow-hidden rounded-sm
                  border border-brand-soft-rose/20
                  bg-white p-2
                  text-left
                  shadow-[0_8px_30px_rgba(43,37,38,0.06)]
                  transition duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_14px_35px_rgba(43,37,38,0.10)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-dark-rose
                  sm:min-w-[65%]
                  md:min-w-0
                "
              >
                <div
                  className="
                    overflow-hidden rounded-sm
                    bg-brand-light-pink/30
                  "
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.alt}
                    loading="lazy"
                    className="
                      h-auto w-full
                      object-contain
                      transition duration-500
                      group-hover:scale-[1.02]
                    "
                  />
                </div>
              </button>
            ))}
          </div>

          <p
            className="
              mt-5 text-center
              text-[10px] uppercase tracking-[0.18em]
              text-brand-text/40
              md:hidden
            "
          >
            Deslize para ver mais
          </p>
        </div>
      </section>

      {/* Modal para ampliar */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Depoimento ampliado"
          onClick={() => setSelectedImage(null)}
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/80
            p-4 backdrop-blur-sm
          "
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar depoimento"
            className="
              absolute right-4 top-4
              flex h-11 w-11
              items-center justify-center
              rounded-full
              bg-white text-brand-text
              shadow-lg
              transition
              hover:scale-105
            "
          >
            <X size={20} />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(event) => event.stopPropagation()}
            className="
              max-h-[88vh] max-w-full
              rounded-sm bg-white
              object-contain
              shadow-2xl
            "
          />
        </div>
      )}
    </>
  );
}