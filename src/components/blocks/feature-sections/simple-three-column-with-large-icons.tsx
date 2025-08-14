"use client"

import { FileText, Shield, Users, ChevronRight } from 'lucide-react'

const features = [
  {
    name: 'Create Your Will',
    description:
      'Answer simple questions about your family and assets. Our system helps you create a legal will that follows Kenyan law. No complicated forms or legal jargon - just clear, simple steps.',
    href: '#',
    icon: FileText,
  },
  {
    name: 'Secure Forever',
    description:
      'Your documents are protected using blockchain technology that makes them tamper-proof. Multiple security layers ensure your family can always trust what you\'ve created.',
    href: '#',
    icon: Shield,
  },
  {
    name: 'Share with Family',
    description:
      'Trusted family members can access your documents when needed. Our secure sharing system ensures only authorized people can view your important information.',
    href: '#',
    icon: Users,
  },
]

export default function SimpleThreeColumnWithLargeIcons() {
  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Three simple steps to protect your family's future with trusted legal protection
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="inline-flex items-center text-sm/6 font-semibold text-primary">
                      Learn more <ChevronRight className="ml-1 size-4" />
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}