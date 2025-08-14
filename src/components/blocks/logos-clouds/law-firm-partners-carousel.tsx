"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface LawFirm {
  id: number;
  name: string;
  shortName: string;
}

const lawFirms: LawFirm[] = [
  { id: 1, name: "Kibet & Associates", shortName: "K&A" },
  { id: 2, name: "Muthama Legal Partners", shortName: "MLP" },
  { id: 3, name: "Kaplan & Stratton", shortName: "K&S" },
  { id: 4, name: "Advocates Alliance", shortName: "AA" },
  { id: 5, name: "Gitonga & Co. Advocates", shortName: "GCA" },
  { id: 6, name: "Nairobi Legal Services", shortName: "NLS" },
  { id: 7, name: "Wanjiku & Partners", shortName: "W&P" },
  { id: 8, name: "Ochieng Legal Group", shortName: "OLG" },
  { id: 9, name: "Kamau Advocates", shortName: "KA" },
  { id: 10, name: "Otieno Law Firm", shortName: "OLF" },
];

export const LawFirmPartnersCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the array for seamless infinite scroll
  const duplicatedFirms = [...lawFirms, ...lawFirms, ...lawFirms];

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Trusted Legal Partners
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get your will notarized by Kenya's top law firms
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We've partnered with verified law firms across Kenya to ensure your will is legally compliant and properly notarized.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 min-w-max"
              animate={{
                x: [0, -2400], // Adjust based on total width
              }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{
                animationPlayState: isHovered ? "paused" : "running",
              }}
            >
              {duplicatedFirms.map((firm, index) => (
                <motion.div
                  key={`${firm.id}-${index}`}
                  className="flex-shrink-0 w-48 h-24 bg-card rounded-lg shadow-sm border border-border flex items-center justify-center cursor-pointer group"
                  whileHover={{ 
                    scale: 1.05,
                    y: -4,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary font-bold text-lg">
                        {firm.shortName}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {firm.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hover Indicator */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-4"
            >
              <div className="bg-muted/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-muted-foreground">
                Hover to pause
              </div>
            </motion.div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-success/10 text-success rounded-full px-4 py-2 text-sm font-medium"
          >
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            All partners are verified and licensed
          </motion.div>
        </div>
      </div>
    </section>
  );
};