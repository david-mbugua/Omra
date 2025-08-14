"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Transition } from "@headlessui/react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

export function TestimonialsGridWithCenteredCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-16 overflow-hidden h-full bg-background">
      <motion.div 
        ref={ref}
        className="pb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="pt-4 font-bold text-foreground text-lg md:text-2xl">
          Trusted by Thousands
        </h1>
        <p className="text-base text-muted-foreground">
          Join families who have secured their legacy with professionally verified wills and trusts
        </p>
      </motion.div>

      <div className=" relative">
        <TestimonialsSlider />
        <div className="h-full max-h-screen md:max-h-none overflow-hidden w-full bg-neutral-light opacity-30 [mask-image:radial-gradient(circle_at_center,transparent_10%,white_99%)]">
          <TestimonialsGrid />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 w-full bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}

export const TestimonialsGrid = () => {
  const first = testimonials.slice(0, 3);
  const second = testimonials.slice(3, 6);
  const third = testimonials.slice(6, 9);
  const fourth = testimonials.slice(9, 12);

  const grid = [first, second, third, fourth];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {grid.map((testimonialsCol, index) => (
        <motion.div 
          key={`testimonials-col-${index}`} 
          className="grid gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          {testimonialsCol.map((testimonial, cardIndex) => (
            <motion.div
              key={`testimonial-${testimonial.src}-${index}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <Quote>{testimonial.quote}</Quote>
                <div className="flex gap-2 items-center mt-8">
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <QuoteDescription>{testimonial.name}</QuoteDescription>
                    <QuoteDescription className="text-[10px]">
                      {testimonial.designation}
                    </QuoteDescription>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-xl border border-border bg-card shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group flex flex-col items-center text-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-xs font-semibold text-foreground py-2 text-center",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs font-normal text-muted-foreground max-w-sm text-center",
        className
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Wanjiku",
    quote:
      "The verified will service gave me confidence that my family's future is secure. The legal team was professional and thorough.",
    src: "https://i.pravatar.cc/150?img=1",
    designation: "Business Owner",
  },
  {
    name: "Michael Ochieng",
    quote:
      "Setting up a trust through Omra was seamless. The platform connected me with excellent lawyers who guided me through everything.",
    src: "https://i.pravatar.cc/150?img=2",
    designation: "Investment Manager",
  },
  {
    name: "Grace Njeri",
    quote:
      "I started with the free will and upgraded to the verified service. The process was smooth and the legal support was invaluable.",
    src: "https://i.pravatar.cc/150?img=3",
    designation: "Teacher",
  },
  {
    name: "David Kimani",
    quote:
      "The trust service helped me protect my business assets for my children. The legal advice was worth every shilling.",
    src: "https://i.pravatar.cc/150?img=4",
    designation: "Entrepreneur",
  },
  {
    name: "Rebecca Muthoni",
    quote:
      "Omra made estate planning accessible and affordable. The verified law firms gave me peace of mind about the legal validity.",
    src: "https://i.pravatar.cc/150?img=5",
    designation: "Doctor",
  },
  {
    name: "John Kariuki",
    quote:
      "The platform is user-friendly and the legal team was responsive. My will was notarized quickly and professionally.",
    src: "https://i.pravatar.cc/150?img=6",
    designation: "Engineer",
  },
  {
    name: "Mary Akinyi",
    quote:
      "Setting up trusts for my children's education was made simple. The legal guidance was comprehensive and clear.",
    src: "https://i.pravatar.cc/150?img=7",
    designation: "Accountant",
  },
  {
    name: "Peter Mutua",
    quote:
      "The free will option let me get started, and I later upgraded for legal verification. Great value for money.",
    src: "https://i.pravatar.cc/150?img=8",
    designation: "Civil Servant",
  },
  {
    name: "Ann Wairimu",
    quote:
      "The trust service helped me structure my property investments properly. The legal team understood my needs perfectly.",
    src: "https://i.pravatar.cc/150?img=9",
    designation: "Real Estate Investor",
  },
  {
    name: "Samuel Otieno",
    quote:
      "Professional service from start to finish. The verified will process was thorough and the lawyers were knowledgeable.",
    src: "https://i.pravatar.cc/150?img=10",
    designation: "Pharmacist",
  },
  {
    name: "Catherine Wambui",
    quote:
      "Omra simplified what I thought would be a complex process. The legal team made estate planning accessible.",
    src: "https://i.pravatar.cc/150?img=11",
    designation: "Marketing Manager",
  },
  {
    name: "Robert Mwangi",
    quote:
      "The platform connected me with excellent lawyers who helped set up a comprehensive trust for my family's future.",
    src: "https://i.pravatar.cc/150?img=12",
    designation: "Consultant",
  },
];

export const TestimonialsSlider = () => {
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const slicedTestimonials = testimonials.slice(0, 3);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === slicedTestimonials.length ? 0 : (active) => active + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [active, autorotate, slicedTestimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        heightFix();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="absolute inset-0 mt-20 md:mt-60">
      <div className="max-w-3xl mx-auto  relative z-40 h-80">
        <div className="relative pb-12 md:pb-20">
          {/* Particles animation */}

          {/* Carousel */}
          <div className="text-center">
            {/* Testimonial image */}
            <div className="relative h-40 [mask-image:_linear-gradient(0deg,transparent,#FFFFFF_30%,#FFFFFF)] md:[mask-image:_linear-gradient(0deg,transparent,#FFFFFF_40%,#FFFFFF)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] -z-10 pointer-events-none before:rounded-full rounded-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-neutral-light/20 before:to-transparent before:to-20% after:rounded-full after:absolute after:inset-0 after:bg-card after:m-px before:-z-20 after:-z-20">
                {slicedTestimonials.map((item, index) => (
                  <Transition
                    key={index}
                    show={active === index}
                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                    enterFrom="opacity-0 -translate-x-10"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-10"
                    beforeEnter={() => heightFix()}
                  >
                    <div className="absolute inset-0 h-full -z-10">
                      <Image
                        className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                        src={item.src}
                        width={56}
                        height={56}
                        alt={item.name}
                      />
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Text */}
            <div className="mb-10 transition-all duration-150 delay-300 ease-in-out px-8 sm:px-6">
              <div className="relative flex flex-col" ref={testimonialsRef}>
                {slicedTestimonials.map((item, index) => (
                  <Transition
                    key={index}
                    show={active === index}
                    enter="transition ease-in-out duration-500 delay-200 order-first"
                    enterFrom="opacity-0 -translate-x-4"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-out duration-300 delay-300 absolute"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-4"
                    beforeEnter={() => heightFix()}
                  >
                    <div className="text-base text-foreground md:text-xl font-bold">
                      {item.quote}
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center -m-1.5 px-8 sm:px-6">
              {slicedTestimonials.map((item, index) => (
                <button
                  className={cn(
                    `px-2 py-1 rounded-full m-1.5 text-xs border border-transparent text-muted-foreground transition duration-150 ease-in-out [background:linear-gradient(theme(colors.card),_theme(colors.card))_padding-box,_conic-gradient(theme(colors.primary),_theme(colors.primary/70)_25%,_theme(colors.primary/70)_75%,_theme(colors.primary)_100%)_border-box] relative before:absolute before:inset-0 before:bg-primary/10 before:rounded-full before:pointer-events-none ${
                      active === index
                        ? "border-primary/50 text-primary"
                        : "border-transparent opacity-70"
                    }`
                  )}
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setAutorotate(false);
                  }}
                >
                  <span className="relative">
                    <span className="text-foreground font-bold">
                      {item.name}
                    </span>{" "}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};