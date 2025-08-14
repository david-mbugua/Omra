"use client"

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Menu, X, Shield, Database, Lock, Users, FileText, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const navigation = [
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Support', href: '#' },
]

interface SimpleCenteredProps {
  onLogoClick?: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
}

export default function SimpleCentered({ onLogoClick, onLogin, onSignUp }: SimpleCenteredProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onLogoClick) {
      onLogoClick()
    }
  }

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onLogin) {
      onLogin()
    }
  }

  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onSignUp) {
      onSignUp()
    }
  }

  return (
    <div className="bg-background">
      <header className="absolute inset-x-0 top-0 z-50">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-label="Global" 
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <motion.button 
              onClick={handleLogoClick}
              className="-m-1.5 p-1.5 flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Omra</span>
            </motion.button>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item, index) => (
              <motion.a 
                key={item.name} 
                href={item.href} 
                className="text-sm/6 font-semibold text-foreground hover:text-primary"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <motion.button
              onClick={handleLogin}
              className="text-sm/6 font-semibold text-muted-foreground hover:text-foreground"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -2 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={handleSignUp}
              className="rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-accent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </motion.nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card p-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <button onClick={handleLogoClick} className="-m-1.5 p-1.5 flex items-center gap-2 cursor-pointer">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">Omra</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-foreground hover:bg-muted"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  <button
                    onClick={handleLogin}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-muted-foreground hover:bg-muted w-full text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-primary-foreground bg-primary hover:bg-accent text-center w-full"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary/20 to-info/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <motion.div 
              className="mb-8 flex justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative inline-flex p-8 rounded-full bg-card shadow-lg">
                <motion.div 
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { icon: Database, color: 'primary' },
                    { icon: Lock, color: 'info' },
                    { icon: Users, color: 'success' },
                    { icon: FileText, color: 'accent' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center justify-center w-8 h-8 bg-${item.color}/20 rounded-lg`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <item.icon className={`w-4 h-4 text-${item.color}`} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.h1 
              className="text-display font-bold tracking-tight text-balance text-foreground sm:text-7xl mb-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Protect What Matters. <br />
              <span className="text-primary">Preserve Your Legacy.</span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Build a lasting legacy and give your loved ones clarity, confidence, and peace of mind—by forming a trust, securing your will, and protecting your wishes for generations.
            </motion.p>
            <motion.div 
              className="mt-8 flex items-center justify-center gap-x-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              <motion.a
                href="#"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Legacy Plan
              </motion.a>
              <motion.a 
                href="#" 
                className="text-sm/6 font-semibold text-foreground border border-primary rounded-md px-3.5 py-2.5 hover:bg-primary/10"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Form a Trust <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-primary/20 to-info/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  )
}