"use client"

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const tiers = [
  {
    id: 'free',
    name: 'Free Will',
    price: { monthly: 'Free', annually: 'Free' },
    description: 'Basic will creation with blockchain security',
    features: ['Basic will template', 'Up to 5 assets', 'Blockchain verification', 'Email support', 'Digital download'],
    featured: false,
    cta: 'Get Started',
  },
  {
    id: 'verified',
    name: 'Verified Will',
    price: { monthly: 'KES 15,000', annually: 'KES 15,000' },
    description: 'Professional notarization with immutable blockchain records',
    features: [
      'Everything in Free Will',
      'Legal review by qualified attorneys',
      'Notarization service',
      'Unlimited assets',
      'Immutable blockchain storage',
      'Anti-forgery protection',
      'Priority support',
      'Legal compliance guarantee',
    ],
    featured: true,
    cta: 'Get Verified',
  },
  {
    id: 'trust',
    name: 'Trust',
    price: { monthly: 'KES 50,000', annually: 'KES 50,000' },
    description: 'Complete trust setup with blockchain-secured asset protection',
    features: [
      'Everything in Verified Will',
      'Trust establishment',
      'Asset protection planning',
      'Tax optimization guidance',
      'Blockchain-secured trust records',
      'Immutable beneficiary tracking',
      'Ongoing trust management',
      'Dedicated legal advisor',
    ],
    featured: false,
    cta: 'Setup Trust',
  },
]

export default function ThreeTiersWithEmphasizedTier() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <form className="group/tiers bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          ref={ref}
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-base/7 font-semibold text-primary">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
            Choose Your Protection Level
          </p>
        </motion.div>
        <motion.p 
          className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          From basic wills to comprehensive trust services - secure your legacy today
        </motion.p>
        <div className="isolate mx-auto mt-12 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              data-featured={tier.featured ? 'true' : undefined}
              className="group/tier rounded-3xl p-8 ring-1 ring-border data-featured:bg-primary data-featured:ring-primary xl:p-10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3
                id={`tier-${tier.id}`}
                className="text-lg/8 font-semibold text-foreground group-data-featured/tier:text-white"
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm/6 text-muted-foreground group-data-featured/tier:text-white/80">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-semibold tracking-tight text-foreground group-data-featured/tier:text-white">
                  {tier.price.monthly}
                </span>
                {tier.price.monthly !== 'Free' && (
                  <span className="text-sm/6 font-semibold text-muted-foreground group-data-featured/tier:text-white/80">
                    one-time
                  </span>
                )}
              </p>

              <motion.button
                value={tier.id}
                name="tier"
                type="submit"
                aria-describedby={`tier-${tier.id}`}
                className="mt-6 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-xs group-data-featured/tier:bg-white/10 group-data-featured/tier:text-white hover:bg-accent group-data-featured/tier:hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-data-featured/tier:focus-visible:outline-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tier.cta}
              </motion.button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-muted-foreground group-data-featured/tier:text-white/80 xl:mt-10"
              >
                {tier.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={feature} 
                    className="flex gap-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                  >
                    <Check
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-primary group-data-featured/tier:text-white"
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </form>
  )
}