import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import {
  BadgeCheck,
  ChevronDown,
  LayoutGrid,
  LoaderCircle,
  Star,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type ProductReview = {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  verified_purchase: boolean;
  created_at: string;
  admin_reply: string | null;
};

type ProductReviewsProps = {
  productSlug: string;
  productName: string;
};

const MAX_COMMENT_LENGTH = 500;

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));

export default function ProductReviews({
  productSlug,
  productName,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loadError, setLoadError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');

    const { data, error } = await supabase
      .from('product_reviews')
      .select(
        'id, customer_name, rating, comment, verified_purchase, created_at, admin_reply',
      )
      .eq('product_slug', productSlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar avaliações:', error);
      setReviews([]);
      setLoadError('Não foi possível carregar as avaliações agora.');
      setIsLoading(false);
      return;
    }

    setReviews((data ?? []) as ProductReview[]);
    setIsLoading(false);
  }, [productSlug]);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        setIsModalOpen(false);
        setFormError('');
        setSuccessMessage('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, isSubmitting]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    return total / reviews.length;
  }, [reviews]);

  const resetForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setRating(0);
    setHoveredRating(0);
    setComment('');
    setFormError('');
  };

  const openModal = () => {
    setFormError('');
    setSuccessMessage('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setFormError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedName = customerName.trim();
    const normalizedEmail = customerEmail.trim().toLowerCase();
    const normalizedComment = comment.trim();

    setFormError('');
    setSuccessMessage('');

    if (normalizedName.length < 2) {
      setFormError('Informe seu nome com pelo menos 2 caracteres.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setFormError('Informe um e-mail válido.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setFormError('Selecione uma nota de 1 a 5 estrelas.');
      return;
    }

    if (normalizedComment.length < 10) {
      setFormError(
        'Escreva um comentário com pelo menos 10 caracteres.',
      );
      return;
    }

    if (normalizedComment.length > MAX_COMMENT_LENGTH) {
      setFormError(
        `O comentário pode ter no máximo ${MAX_COMMENT_LENGTH} caracteres.`,
      );
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('product_reviews')
      .insert({
        product_slug: productSlug,
        customer_name: normalizedName,
        customer_email: normalizedEmail,
        rating,
        comment: normalizedComment,
      });

    setIsSubmitting(false);

    if (error) {
      console.error('Erro ao enviar avaliação:', error);
      setFormError(
        'Não foi possível enviar sua avaliação. Tente novamente.',
      );
      return;
    }

    resetForm();
    setSuccessMessage(
      'Avaliação enviada com sucesso. Ela será publicada após aprovação.',
    );
  };

  return (
    <>
      <section
        id="avaliacoes"
        className="border-t border-[#E8E2DF] bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-sans text-3xl font-bold text-neutral-900 sm:text-4xl">
            Avaliações
          </h2>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-1"
                aria-label={`Nota média: ${averageRating.toFixed(
                  1,
                )} de 5`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={27}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className={
                      star <= Math.round(averageRating)
                        ? 'fill-neutral-950 text-neutral-950'
                        : 'fill-transparent text-neutral-300'
                    }
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 text-lg text-neutral-800">
                <span>
                  {reviews.length}{' '}
                  {reviews.length === 1
                    ? 'Avaliação'
                    : 'Avaliações'}
                </span>

                <ChevronDown
                  size={17}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openModal}
                className="min-h-14 rounded-md border border-[#DCDCDC] bg-white px-8 text-base font-bold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                Avalie
              </button>

              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-md border border-[#DCDCDC] bg-white text-neutral-900"
              >
                <LayoutGrid size={24} strokeWidth={2.4} />
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-[#E5E5E5]" />

          {isLoading && (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-neutral-500">
              <LoaderCircle size={18} className="animate-spin" />
              Carregando avaliações...
            </div>
          )}

          {!isLoading && loadError && (
            <div className="my-10 border border-red-200 bg-red-50 p-6">
              <p className="text-sm text-red-700">{loadError}</p>

              <button
                type="button"
                onClick={() => void loadReviews()}
                className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-red-700 underline"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!isLoading &&
            !loadError &&
            reviews.length === 0 && (
              <div className="py-16 text-center">
                <Star
                  size={28}
                  className="mx-auto text-neutral-300"
                  aria-hidden="true"
                />

                <p className="mt-4 text-base font-bold text-neutral-900">
                  Nenhuma avaliação publicada
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  Seja a primeira pessoa a avaliar este produto.
                </p>

                <button
                  type="button"
                  onClick={openModal}
                  className="mt-7 rounded-md border border-neutral-900 px-7 py-3 text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                >
                  Avalie este produto
                </button>
              </div>
            )}

          {!isLoading &&
            !loadError &&
            reviews.length > 0 && (
              <div>
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="grid grid-cols-1 gap-6 border-b border-[#E5E5E5] py-10 md:grid-cols-[280px_minmax(0,1fr)_120px] md:gap-10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F0F2F7] text-sm font-bold tracking-[0.2em] text-[#74819A]">
                        {getInitials(review.customer_name)}
                      </div>

                      <div className="pt-1">
                        <p className="text-base font-bold text-neutral-900">
                          {review.customer_name}
                        </p>

                        {review.verified_purchase && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                            <BadgeCheck
                              size={17}
                              className="fill-sky-500 text-white"
                              aria-hidden="true"
                            />

                            <span>Comprador verificado</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div
                        className="flex items-center gap-1"
                        aria-label={`${review.rating} de 5 estrelas`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={24}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className={
                              star <= review.rating
                                ? 'fill-brand-dark-rose text-brand-dark-rose'
                                : 'fill-transparent text-neutral-300'
                            }
                          />
                        ))}
                      </div>

                      <p className="mt-5 max-w-3xl whitespace-pre-line break-words text-base leading-relaxed text-neutral-700">
                        {review.comment}
                      </p>

                      {review.admin_reply && (
                        <div className="mt-6 rounded-xl border border-[#E8E2DF] bg-[#F8F5F3] p-5">
                          <p className="text-sm font-bold text-neutral-950">
                            Resposta da TL Atelier
                          </p>

                          <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-neutral-700">
                            {review.admin_reply}
                          </p>
                        </div>
                      )}
                    </div>

                    <time
                      dateTime={review.created_at}
                      className="text-sm text-neutral-500 md:text-right"
                    >
                      {formatDate(review.created_at)}
                    </time>
                  </article>
                ))}
              </div>
            )}
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-3 py-4 sm:px-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            className="relative max-h-[92vh] w-full max-w-[700px] overflow-y-auto rounded-[22px] bg-white shadow-2xl"
          >
            <div className="p-6 sm:p-9 lg:p-10">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <h2
                    id="review-modal-title"
                    className="text-2xl font-bold text-neutral-950 sm:text-3xl"
                  >
                    Enviar avaliação
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Conte como foi sua experiência com {productName}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Fechar formulário de avaliação"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition-colors hover:bg-neutral-200"
                >
                  <X size={21} />
                </button>
              </div>

              {successMessage ? (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"
                >
                  <p className="text-sm font-semibold text-emerald-800">
                    {successMessage}
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 min-h-12 bg-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="review-customer-name"
                      className="mb-3 block text-base font-bold text-neutral-950"
                    >
                      Nome
                    </label>

                    <input
                      id="review-customer-name"
                      type="text"
                      value={customerName}
                      onChange={(event) =>
                        setCustomerName(event.target.value)
                      }
                      maxLength={50}
                      autoComplete="name"
                      autoFocus
                      className="h-[68px] w-full rounded-xl border border-neutral-300 bg-white px-5 text-base text-neutral-900 outline-none transition-colors focus:border-brand-dark-rose focus:ring-1 focus:ring-brand-dark-rose"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="review-customer-email"
                      className="mb-3 block text-base font-bold text-neutral-950"
                    >
                      E-mail
                    </label>

                    <input
                      id="review-customer-email"
                      type="email"
                      value={customerEmail}
                      onChange={(event) =>
                        setCustomerEmail(event.target.value)
                      }
                      maxLength={120}
                      autoComplete="email"
                      className="h-[68px] w-full rounded-xl border border-neutral-300 bg-white px-5 text-base text-neutral-900 outline-none transition-colors focus:border-brand-dark-rose focus:ring-1 focus:ring-brand-dark-rose"
                    />

                    <p className="mt-2 text-xs text-neutral-400">
                      Seu e-mail não será publicado.
                    </p>
                  </div>

                  <fieldset className="mb-7">
                    <legend className="mb-4 block text-base font-bold text-neutral-950">
                      Nota
                    </legend>

                    <div
                      className="flex items-center gap-1 sm:gap-2"
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      {[1, 2, 3, 4, 5].map((star) => {
                        const activeRating =
                          hoveredRating || rating;
                        const isActive = star <= activeRating;

                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() =>
                              setHoveredRating(star)
                            }
                            aria-label={`${star} ${
                              star === 1
                                ? 'estrela'
                                : 'estrelas'
                            }`}
                            aria-pressed={rating === star}
                            className="p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-rose"
                          >
                            <Star
                              size={43}
                              strokeWidth={1.5}
                              aria-hidden="true"
                              className={
                                isActive
                                  ? 'fill-brand-dark-rose text-brand-dark-rose'
                                  : 'fill-transparent text-neutral-300'
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="review-comment"
                      className="mb-3 block text-base font-bold text-neutral-950"
                    >
                      Comentário
                    </label>

                    <textarea
                      id="review-comment"
                      value={comment}
                      onChange={(event) =>
                        setComment(event.target.value)
                      }
                      maxLength={MAX_COMMENT_LENGTH}
                      rows={7}
                      className="min-h-[190px] w-full resize-y rounded-xl border border-neutral-300 bg-white px-5 py-4 text-base text-neutral-900 outline-none transition-colors focus:border-brand-dark-rose focus:ring-1 focus:ring-brand-dark-rose"
                    />

                    <div className="mt-2 flex justify-end">
                      <span className="text-xs text-neutral-400">
                        {comment.length}/{MAX_COMMENT_LENGTH}
                      </span>
                    </div>
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />
                        Enviando
                      </>
                    ) : (
                      'Enviar avaliação'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}