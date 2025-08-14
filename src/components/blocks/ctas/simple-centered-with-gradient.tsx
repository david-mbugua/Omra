import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SimpleCenteredWithGradient() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFF9F6] to-[#F2F4F7] py-16 sm:py-20">
      <div className="px-6 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Secure Your Legacy. Empower Your Loved Ones.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-muted-foreground">
            Create a trust, safeguard your assets, and make sure your wishes last for generations. Start protecting your legacy today—your family will thank you.
          </p>
          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.a
              href="#"
              className="rounded-md bg-[#FF6B57] px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-[#FF3D3D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B57]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Protect My Legacy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm/6 font-semibold text-[#FF6B57] hover:text-[#FF3D3D] border border-[#FF6B57] rounded-md px-3.5 py-2.5 bg-transparent hover:border-[#FF3D3D]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Form a Trust
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <motion.svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.7 } : { scale: 0.5, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <circle r={512} cx={512} cy={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#FF6B57" />
            <stop offset={1} stopColor="#FF3D3D" />
          </radialGradient>
        </defs>
      </motion.svg>
    </div>
  )
}