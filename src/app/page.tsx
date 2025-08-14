"use client"

import { useState } from "react"
import SimpleCentered from "@/components/blocks/heros/simple-centered"
import SimpleThreeColumnWithLargeIcons from "@/components/blocks/feature-sections/simple-three-column-with-large-icons"
import WithProductScreenshot from "@/components/blocks/feature-sections/with-product-screenshot"
import SimpleThreeColumnWithSmallIcons from "@/components/blocks/feature-sections/simple-three-column-with-small-icons"
import { TestimonialsGridWithCenteredCarousel } from "@/components/blocks/testimonials/testimonials-grid-with-centered-carousel"
import ThreeTiersWithEmphasizedTier from "@/components/blocks/pricing/three-tiers-with-emphasized-tier"
import SimpleCenteredWithGradient from "@/components/blocks/ctas/simple-centered-with-gradient"
import { FooterWithGrid } from "@/components/blocks/footers/footer-with-grid"
import { LawFirmPartnersCarousel } from "@/components/blocks/logos-clouds/law-firm-partners-carousel"
import { FAQSection } from "@/components/blocks/faqs/omra-platform-faqs"
import OmraDashboard from "@/components/dashboard/omra-dashboard"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { LoginForm } from "@/components/auth/login-form"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'onboarding' | 'dashboard' | 'role-dashboard'>('landing')
  const [userName, setUserName] = useState("John Doe")
  // Accept all roles: owner, guardian, executor
  const [loginRole, setLoginRole] = useState<null | 'owner' | 'guardian' | 'executor'>(null);

  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path)
  }

  const handleAddAsset = () => {
    console.log("Adding new asset")
  }

  const handleNotificationClick = () => {
    console.log("Notification clicked")
  }

  const handleUserMenuClick = () => {
    console.log("User menu clicked")
  }

  const handleSearchSubmit = (query: string) => {
    console.log("Search query:", query)
  }

  const handleGetStarted = () => {
    setCurrentView('dashboard')
  }

  const handleLogin = () => {
    setCurrentView('login')
  }

  const handleSignUp = () => {
    setCurrentView('signup')
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
  }

  const handleLogoClick = () => {
    setCurrentView('dashboard')
  }

  const handleLoginSuccess = (loginData: { role: 'owner' | 'guardian' | 'executor' }) => {
    console.log("Login successful with role:", loginData)
    setLoginRole(loginData.role);
    if (loginData.role === 'owner') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('role-dashboard');
    }
  }

  const handleSignUpSuccess = () => {
    setCurrentView('onboarding')
  }

  const handleOnboardingComplete = () => {
    setCurrentView('dashboard')
  }

  const handleForgotPassword = () => {
    console.log("Forgot password clicked")
  }

  const handleSignUpFromLogin = () => {
    setCurrentView('signup')
  }

  if (currentView === 'login') {
    return (
      <LoginForm 
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={handleBackToLanding}
        onForgotPassword={handleForgotPassword}
        onSignUpClick={handleSignUpFromLogin}
      />
    )
  }

  if (currentView === 'signup') {
    return (
      <SignUpForm 
        onSignUpSuccess={handleSignUpSuccess}
        onBackToLanding={handleBackToLanding}
      />
    )
  }

  if (currentView === 'onboarding') {
    return <OnboardingFlow />
  }

  if (currentView === 'dashboard') {
    return (
      <OmraDashboard
        userName={userName}
        onNavigate={handleNavigate}
        onAddAsset={handleAddAsset}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
        onSearchSubmit={handleSearchSubmit}
      />
    )
  }

  if (currentView === 'role-dashboard') {
    // Determine proper role dashboard stub
    if (loginRole === 'executor') {
      // Use dedicated ExecutorDashboard
      const { ExecutorDashboard } = require("@/components/dashboard/executor-dashboard");
      return (
        <ExecutorDashboard
          userName={userName + " (Executor)"}
          onLogout={handleBackToLanding}
        />
      );
    } else if (loginRole === 'guardian') {
      // Load GuardianDashboard for guardians
      const { GuardianDashboard } = require("@/components/dashboard/guardian-dashboard");
      return (
        <GuardianDashboard
          userName={userName + " (Guardian)"}
          onLogOut={handleBackToLanding}
        />
      );
    } else {
      // fallback for legacy/trusted or any other role
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E2F] mb-4">Trusted Friend Dashboard</h1>
          <p className="text-lg text-[#4A4A68] mb-6">Welcome! You are logged in as an Executor or Guardian.<br />You'll see tasks and responsibilities assigned to you here.</p>
          <Button className="mt-2 bg-[#FF6B57] hover:bg-[#FF3D3D] text-white font-semibold px-6 py-3 rounded-lg" onClick={handleBackToLanding}>Log Out</Button>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SimpleCentered onLogoClick={handleLogoClick} onLogin={handleLogin} onSignUp={handleSignUp} />
      <SimpleThreeColumnWithLargeIcons />
      <WithProductScreenshot />
      <SimpleThreeColumnWithSmallIcons />
      <LawFirmPartnersCarousel />
      <TestimonialsGridWithCenteredCarousel />
      <ThreeTiersWithEmphasizedTier />
      <FAQSection />
      <SimpleCenteredWithGradient />
      <FooterWithGrid onLogoClick={handleLogoClick} />
    </div>
  )
}