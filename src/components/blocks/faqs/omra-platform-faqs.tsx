"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Shield, Lock, Clock, FileText, Users, Check, AlertCircle, Star, ToggleLeft, ToggleRight } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  simpleAnswer: string;
  technicalAnswer: string;
  category: "general" | "trust" | "security";
  priority?: boolean;
}

interface FAQSectionProps {
  className?: string;
}

const faqData: FAQ[] = [
  {
    id: "what-is-omra",
    question: "What is Omra and how does it work?",
    simpleAnswer: "Omra helps you create a legal will online. We make sure your will is safe and can't be changed by anyone else. We work with lawyers to make sure everything is done right. It's simple: fill out our form, talk to a lawyer, and get your will that's protected forever.",
    technicalAnswer: "Omra is Kenya's leading digital estate planning platform that uses web3 technology to create legally valid wills and trusts. Our blockchain-based system ensures your will's data is immutable and tamper-proof. We connect you with verified law firms while recording every action on the blockchain to prevent forgery. The process is simple: complete our guided questionnaire, review your document with a legal expert, and receive your blockchain-secured, notarized will or trust.",
    category: "general",
    priority: true
  },
  {
    id: "blockchain-security",
    question: "How do we protect your will from being faked?",
    simpleAnswer: "We use special computer technology that makes it impossible for anyone to change or fake your will. Think of it like a permanent ink that can never be erased. Once your will is saved, no one can alter it. If anyone tries to change it, we'll know immediately.",
    technicalAnswer: "Our platform uses web3 technology to make your will's data completely immutable. Every action - from creation to modifications - is permanently recorded on the blockchain, creating an unchangeable audit trail. This means no one can forge, tamper with, or alter your will without detection. Each document receives a unique blockchain hash that serves as a digital fingerprint, and any attempt to modify the document would change this hash, immediately alerting all parties to potential tampering. This level of security is impossible to achieve with traditional paper-based wills.",
    category: "security",
    priority: true
  },
  {
    id: "free-vs-verified",
    question: "What's the difference between Free Will and Verified Will?",
    simpleAnswer: "Free Will gives you a basic will that's protected. Verified Will (15,000 Ksh) gives you everything from Free Will plus a lawyer checks it and makes it official. Both wills are protected forever, but the Verified Will has extra lawyer support to make sure it follows all Kenyan laws.",
    technicalAnswer: "Our Free Will service provides a basic will template that's secured on the blockchain. The Verified Will service (Ksh 15,000) includes everything from the Free Will plus professional legal review, notarization by verified law firms, and enhanced blockchain verification. Both services record your will on the blockchain for immutability, but the Verified Will adds legal expert validation and enhanced compliance with Kenyan succession laws for maximum protection.",
    category: "general",
    priority: true
  },
  {
    id: "trust-vs-will",
    question: "Why should I create a Trust instead of just a Will?",
    simpleAnswer: "A Trust helps your family get their inheritance faster and with less hassle. Unlike regular wills, trusts don't need to go through long court processes. Your family gets what you left them quicker, with more privacy, and better protection. Plus, our system keeps everything safe from people who might try to dispute it.",
    technicalAnswer: "A Trust offers significant advantages over a traditional will. Unlike wills, trusts avoid the lengthy and expensive probate process, ensuring your beneficiaries receive their inheritance faster and with greater privacy. Trusts provide superior asset protection from creditors and legal disputes, offer tax planning opportunities, and allow you to maintain control over how and when assets are distributed. With our blockchain-secured trusts, you get all these benefits plus immutable record-keeping that prevents any disputes about the trust's terms or modifications.",
    category: "trust",
    priority: true
  },
  {
    id: "trust-benefits",
    question: "What are the main benefits of setting up a Trust?",
    simpleAnswer: "Setting up a Trust helps in many ways: (1) Your family gets their inheritance immediately without waiting for courts, (2) Your assets are protected from people who might want to take them, (3) You might save money on taxes, (4) Your family matters stay private, (5) You decide exactly how and when your family gets their inheritance, (6) If you become sick, someone can manage your assets, (7) You save money on legal fees over time, and (8) Everything is protected forever with our security system.",
    technicalAnswer: "Setting up a Trust provides multiple key benefits: (1) Probate Avoidance - your assets transfer immediately to beneficiaries without court involvement, (2) Asset Protection - shields your wealth from creditors and legal claims, (3) Tax Efficiency - potential tax savings through strategic planning, (4) Privacy Protection - keeps your estate matters confidential, (5) Control - you can specify exactly how and when beneficiaries receive assets, (6) Continuity - ensures seamless management if you become incapacitated, (7) Cost Savings - reduces long-term legal and administrative expenses, and (8) Blockchain Security - immutable record-keeping prevents disputes and forgery.",
    category: "trust"
  },
  {
    id: "trust-service-process",
    question: "How does the Trust service work?",
    simpleAnswer: "Our Trust service (50,000 Ksh) includes everything you need to protect your family's future. First, we talk to understand your needs. Then we create your trust papers, work with trusted lawyers to check everything, and save it all safely forever. You get all the documents you need and support whenever you need it. It usually takes 2-3 weeks from start to finish.",
    technicalAnswer: "Our comprehensive Trust service (Ksh 50,000) includes everything you need for complete estate protection with blockchain security. The process begins with a detailed consultation to understand your assets and goals. We then draft your trust documents, coordinate with our verified law firm partners for legal review, and record everything on the blockchain for immutability. The package includes the trust deed, administrative guidelines, beneficiary documentation, blockchain verification, and ongoing support. The entire process typically takes 2-3 weeks from initial consultation to final blockchain recording.",
    category: "trust"
  },
  {
    id: "verified-law-firms",
    question: "Are your lawyer partners verified?",
    simpleAnswer: "Yes, absolutely. All our lawyer partners are properly licensed and checked by Kenya's Law Society. We only work with lawyers who have good records and specialize in wills and inheritance. We regularly check to make sure they maintain high standards. Everything they do is also recorded safely so you can see exactly what happened.",
    technicalAnswer: "Absolutely. All our law firm partners undergo rigorous verification including Law Society of Kenya (LSK) licensing verification, professional standing checks, and ongoing compliance monitoring. We only work with firms that have proven track records in estate planning and succession law. Each partner firm is regularly audited to ensure they maintain the highest professional standards. Additionally, all interactions with law firms are recorded on the blockchain, ensuring complete transparency and preventing any unauthorized changes to your documents.",
    category: "security"
  },
  {
    id: "existing-will-trust",
    question: "What happens if I already have a Will but want to create a Trust?",
    simpleAnswer: "Having both a Will and a Trust is actually the best way to protect your family. A Trust handles most of your assets while you're alive and after you die, while a Will takes care of anything not in the Trust. We can help you create a protected Trust that works well with your existing Will, or we can update your Will to work better with your new Trust.",
    technicalAnswer: "Having both a Will and a Trust is actually the gold standard in estate planning. A Trust handles the majority of your assets during your lifetime and immediately after death, while a Will serves as a backup for any assets not included in the Trust (called a 'pour-over will'). We can help you create a blockchain-secured Trust that works seamlessly with your existing Will, or we can digitize and update your Will to complement your new Trust structure. The blockchain ensures both documents are tamper-proof and work together perfectly.",
    category: "trust"
  },
  {
    id: "blockchain-immutability",
    question: "What does 'can never be changed' mean for my will?",
    simpleAnswer: "When we say your will can never be changed, we mean that once it's saved in our system, no one can alter, delete, or fake it. Unlike paper wills that can be destroyed or changed, our technology creates a permanent record that lasts forever. If you want to make real changes, we create a new version, but the old versions stay as proof of what happened before.",
    technicalAnswer: "Immutable means your will cannot be changed, deleted, or tampered with once it's recorded on the blockchain. Unlike traditional wills that can be destroyed, forged, or altered, blockchain technology creates a permanent, unchangeable record. Every version of your will is time-stamped and cryptographically secured across multiple nodes in the network. If you need to make legitimate changes, we create a new version that's also recorded on the blockchain, but the previous versions remain as a historical record, ensuring complete transparency and preventing fraud.",
    category: "security"
  },
  {
    id: "document-changes",
    question: "Can I make changes to my Will or Trust after creation?",
    simpleAnswer: "Yes, you can make changes through our secure update service. For Wills, simple changes like adding beneficiaries or assets can be handled easily. Each change is safely recorded while keeping a history of all previous versions. Trust changes depend on what you want to update, and all changes are permanently and safely recorded for complete transparency.",
    technicalAnswer: "Yes, you can make changes to your documents through our blockchain-secured amendment service. For Wills, simple updates like beneficiary changes or asset additions can be handled through codicils or complete rewrites depending on the scope of changes. Each amendment is recorded on the blockchain as a new version while preserving the history of all previous versions. Trust amendments vary based on the type of changes needed, and all updates are permanently recorded on the blockchain for complete transparency and fraud prevention.",
    category: "general"
  },
  {
    id: "omra-difference",
    question: "What makes Omra different from other will services?",
    simpleAnswer: "Omra is the first service in Kenya to use advanced protection technology for wills and trusts. Unlike basic will services, we offer both Wills and Trusts with special technology that makes your documents completely safe from faking. We work with verified lawyers, have clear pricing, and focus on Kenyan law. Our combination of the best security technology with local legal expertise makes us the safest and most complete solution available.",
    technicalAnswer: "Omra is uniquely positioned as Kenya's first blockchain-powered estate planning platform. Unlike basic will services, we offer both Wills and Trusts with revolutionary web3 technology that makes your documents completely tamper-proof. Our blockchain integration prevents forgery and provides immutable record-keeping that traditional services cannot match. We also offer verified law firm partnerships, transparent pricing, and focus specifically on Kenyan law. Our combination of advanced blockchain security with local legal expertise makes us the most secure and comprehensive estate planning solution available.",
    category: "general"
  }
];

export const FAQSection = ({ className = "" }: FAQSectionProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTechnicalMode, setIsTechnicalMode] = useState(false);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const getCategoryIcon = (category: FAQ["category"]) => {
    switch (category) {
      case "trust":
        return <Shield className="w-5 h-5 text-primary" />;
      case "security":
        return <Lock className="w-5 h-5 text-info" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const priorityFAQs = faqData.filter(faq => faq.priority);
  const regularFAQs = faqData.filter(faq => !faq.priority);

  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <AlertCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Questions People Ask
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Everything you need to know about creating wills and trusts with Omra. 
            Can't find what you're looking for? Contact our support team.
          </motion.p>

          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 p-4 bg-muted/30 rounded-lg"
          >
            <span className={`text-sm font-medium transition-colors ${!isTechnicalMode ? 'text-primary' : 'text-muted-foreground'}`}>
              Simple Explanations
            </span>
            <motion.button
              onClick={() => setIsTechnicalMode(!isTechnicalMode)}
              className="relative flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isTechnicalMode ? (
                <ToggleRight className="w-8 h-8 text-primary" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-muted-foreground" />
              )}
            </motion.button>
            <span className={`text-sm font-medium transition-colors ${isTechnicalMode ? 'text-primary' : 'text-muted-foreground'}`}>
              Technical Details
            </span>
          </motion.div>
        </div>

        {/* Trust Benefits Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 mb-12 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Why Choose a Trust Over a Basic Will?
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Skip Court Process</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Protect Your Assets</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Keep It Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Save on Taxes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Faster for Family</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">More Control</span>
            </div>
          </div>
        </motion.div>

        {/* Priority FAQs */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2"
          >
            <Star className="w-5 h-5 text-primary" />
            Most Important Questions
          </motion.h3>
          <div className="space-y-4">
            {priorityFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
              >
                <motion.button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                  whileHover={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(faq.category)}
                    <span className="font-medium text-foreground pr-8">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: activeId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-2"
                      >
                        <div className="bg-muted/30 rounded-lg p-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {isTechnicalMode ? faq.technicalAnswer : faq.simpleAnswer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Regular FAQs */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2"
          >
            <Users className="w-5 h-5 text-muted-foreground" />
            More Information
          </motion.h3>
          <div className="space-y-4">
            {regularFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
              >
                <motion.button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                  whileHover={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(faq.category)}
                    <span className="font-medium text-foreground pr-8">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: activeId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-2"
                      >
                        <div className="bg-muted/30 rounded-lg p-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {isTechnicalMode ? faq.technicalAnswer : faq.simpleAnswer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you understand how to protect your family's future.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};