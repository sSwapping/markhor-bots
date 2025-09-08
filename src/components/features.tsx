"use client";
import { Gift, Ticket, CreditCard, Tag } from "lucide-react";

const features = [
  {
    icon: <Ticket className='w-8 h-8 text-old-gold-500' />,
    title: "Ticket Systeem",
    description:
      "Volledige integratie met ticketbeheer voor efficiënte ondersteuning van je community leden.",
    expandable: true,
  },
  {
    icon: <Gift className='w-8 h-8 text-old-gold-500' />,
    title: "Giveaway Systeem",
    description:
      "Functionaliteit voor het aanmaken en beheren van giveaways om je community te betrekken.",
    expandable: true,
  },
];

const tebexFeatures = [
  {
    icon: <CreditCard className='w-6 h-6 text-old-gold-500' />,
    title: "Payments",
    description: "Betalingsverwerking",
  },
  {
    icon: <Gift className='w-6 h-6 text-old-gold-500' />,
    title: "Giftcards",
    description: "Beheer van cadeaubonnen",
  },
  {
    icon: <Tag className='w-6 h-6 text-old-gold-500' />,
    title: "Coupons",
    description: "Couponbeheer en validatie",
  },
];

export default function FeaturesLandingPageSection() {
  return (
    <section
      id='features'
      className='py-16 md:py-24 px-4 mx-auto max-w-[1320px]'
    >
      <div className='mb-16 text-center'>
        <h2 className='mb-4 text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground'>
          Features
        </h2>
        <p className='mx-auto max-w-2xl text-base md:text-lg text-white/80'>
          availabl helps you detect and resolve issues before your customers
          even notice. A modern approach to monitoring and incident response
          that leverages your existing data and toolchain.
        </p>
      </div>

      <div className='grid gap-6 mb-16 md:gap-8'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='overflow-hidden relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 group border-neutral-800/50 bg-neutral-900/50 md:p-8 hover:border-old-gold-500/30 hover:bg-neutral-900/70'
          >
            <div className='flex gap-4 items-start md:gap-6'>
              <div className='flex-shrink-0 p-3 rounded-xl border bg-old-gold-500/10 border-old-gold-500/20'>
                {feature.icon}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='text-xl font-semibold text-white md:text-2xl'>
                    {feature.title}
                  </h3>
                  {feature.expandable && (
                    <button className='flex-shrink-0 p-2 rounded-lg transition-colors text-old-gold-500 hover:bg-old-gold-500/10'>
                      <svg
                        className='w-5 h-5 transition-transform duration-300 transform group-hover:rotate-180'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <p className='leading-relaxed text-white/80'>
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tebex Integration Section */}
      <div className='overflow-hidden relative p-6 rounded-2xl border backdrop-blur-sm border-neutral-800/50 bg-neutral-900/50 md:p-8'>
        <div className='mb-8 text-center'>
          <h3 className='mb-4 text-2xl font-semibold text-white md:text-3xl'>
            Tebex Integratie
          </h3>
          <p className='mx-auto max-w-2xl text-white/80'>
            Naadloze integratie met Tebex voor complete e-commerce
            functionaliteit in je Discord server.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {tebexFeatures.map((feature, index) => (
            <div
              key={index}
              className='p-6 text-center rounded-xl border transition-all duration-300 border-neutral-800/30 bg-neutral-800/20 hover:bg-neutral-800/40 hover:border-old-gold-500/30'
            >
              <div className='flex justify-center mb-4'>
                <div className='p-3 rounded-xl border bg-old-gold-500/10 border-old-gold-500/20'>
                  {feature.icon}
                </div>
              </div>
              <h4 className='mb-2 text-lg font-semibold text-white'>
                {feature.title}
              </h4>
              <p className='text-sm text-white/70'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
