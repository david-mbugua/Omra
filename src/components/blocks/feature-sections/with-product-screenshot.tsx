"use client"

import { FileText, Users, CheckCircle, Link } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    name: 'Blockchain-secured creation',
    description:
      'Our platform uses web3 technology to create immutable wills, with every action logged on the blockchain.',
    icon: FileText,
  },
  {
    name: 'Verified law firms',
    description: 'Connect with our network of verified, experienced law firms for professional notarization services.',
    icon: Users,
  },
  {
    name: 'Immutable records',
    description: 'All document changes are permanently recorded on the blockchain, preventing forgery and tampering.',
    icon: Link,
  },
  {
    name: 'Legal compliance',
    description: 'All wills and trusts are created to meet local legal requirements with blockchain verification.',
    icon: CheckCircle,
  },
]

export default function WithProductScreenshot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <motion.div 
            ref={ref}
            className="lg:pt-4 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-[#FF6B57]">Web3 Will & Trust Platform</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[#1E1E2F] sm:text-5xl">
                Blockchain-Secured Legal Services
              </p>
              <p className="mt-6 text-lg/8 text-[#4A4A68]">
                Create legally binding wills and trusts with blockchain technology. Our web3 platform makes your will's data immutable and prevents forgery through decentralized verification.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-[#4A4A68] lg:max-w-none">
                {features.map((feature, index) => (
                  <motion.div 
                    key={feature.name} 
                    className="relative pl-9"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <dt className="inline font-semibold text-[#1E1E2F]">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-[#FF6B57]" />
                      </motion.div>
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-xl ring-1 ring-gray-400/10"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1E1E2F]">My Blockchain Will</h3>
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-2 h-2 bg-[#36D399] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-[#4A4A68]">Immutable</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Primary Residence', value: 'Ksh 15M', beneficiary: 'Spouse & Children' },
                  { name: 'Investment Portfolio', value: 'Ksh 8M', beneficiary: 'Children Trust Fund' },
                  { name: 'Business Assets', value: 'Ksh 12M', beneficiary: 'Business Trust' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.name}
                    className="p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1E1E2F]">{item.name}</span>
                      <span className="text-[#FF6B57]">{item.value}</span>
                    </div>
                    <p className="text-sm text-[#4A4A68] mt-1">To: {item.beneficiary}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-6 pt-4 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#4A4A68]">Blockchain Hash: 0x4a5b...</span>
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-[#36D399]" />
                    <span className="text-[#36D399]">Verified on chain</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-[#4A4A68]">Notarized by: Kibet & Associates</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#36D399]" />
                    <span className="text-[#36D399]">Legally binding</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}