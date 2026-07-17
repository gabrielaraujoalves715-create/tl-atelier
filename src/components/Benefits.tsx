import {
  ShieldCheck,
  CalendarCheck,
  CreditCard,
  Compass,
} from 'lucide-react';

export default function Benefits() {
  const benefitsList = [
    {
      icon: <ShieldCheck size={20} className="stroke-[1.25]" />,
      title: 'Prata 925 legítima',
      description:
        'Joias autênticas produzidas em Prata 925, com qualidade, brilho e durabilidade.',
    },
    {
      icon: <CalendarCheck size={20} className="stroke-[1.25]" />,
      title: 'Garantia de 2 anos',
      description:
        'Garantia de 2 anos contra defeitos de fabricação e problemas no material.',
    },
    {
      icon: <CreditCard size={20} className="stroke-[1.25]" />,
      title: 'Pix, cartão ou dinheiro',
      description:
        'Escolha a forma de pagamento mais conveniente para realizar sua compra.',
    },
    {
      icon: <Compass size={20} className="stroke-[1.25]" />,
      title: 'Entrega e retirada em SP',
      description:
        'Receba seu pedido ou escolha a opção de retirada presencial em São Paulo.',
    },
  ];

  return (
    <section
      id="beneficios"
      className="
        border-b border-brand-soft-rose/20
        bg-brand-light-pink/5
        py-16
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid grid-cols-1 gap-6
            sm:grid-cols-2 sm:gap-8
            lg:grid-cols-4
          "
        >
          {benefitsList.map((item, index) => (
            <div
              key={item.title}
              id={`benefit-${index}`}
              className="
                flex flex-col items-center
                rounded-xs border
                border-brand-soft-rose/15
                bg-white p-6
                text-center
                transition-all duration-300
                hover:border-brand-soft-rose/40
                hover:shadow-xs
              "
            >
              <div
                className="
                  mb-4 flex h-10 w-10
                  items-center justify-center
                  rounded-sm border
                  border-brand-soft-rose/10
                  bg-brand-light-pink/20
                  text-brand-dark-rose
                "
              >
                {item.icon}
              </div>

              <h3
                className="
                  mb-2 font-sans
                  text-[13px] font-semibold
                  tracking-[0.025em]
                  text-brand-text
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  max-w-[250px]
                  font-sans text-[11px]
                  font-normal leading-[1.65]
                  text-brand-text/65
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}