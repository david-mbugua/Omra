import { Shield, Link, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    name: 'Protected Forever',
    description:
      'Special technology keeps your will safe from changes. Once saved, it stays exactly as you wrote it',
    href: '#',
    icon: Link,
  },
  {
    name: 'Cannot Be Faked',
    description:
      'Advanced security tracks every action, making it impossible for anyone to create fake copies',
    href: '#',
    icon: Shield,
  },
  {
    name: 'Always Verified',
    description:
      'Multiple security checks ensure your will is real and legally valid at all times',
    href: '#',
    icon: CheckCircle,
  },
]

export default function SimpleThreeColumnWithSmallIcons() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          ref={ref}
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-base/7 font-semibold text-success">Advanced Security</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            Your will is protected from fraud
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            We use the latest security technology to make sure your will can never be changed or faked by anyone.
          </p>
        </motion.div>
        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ y: -5 }}
              >
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-foreground">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon aria-hidden="true" className="size-5 flex-none text-success" />
                  </motion.div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <motion.a 
                      href={feature.href} 
                      className="text-sm/6 font-semibold text-success hover:text-success/80"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </motion.a>
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}