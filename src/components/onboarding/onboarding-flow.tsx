"use client";

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Wallet, Users, UserCheck, Bell, CheckCircle, ArrowRight, Lock, Globe, Heart, Phone, CreditCard, Home, Key, Plus } from 'lucide-react'

interface OnboardingData {
  assets: string[]
  firstAsset: {
    name: string
    type: string
    value: string
    status: string
  }
  beneficiary: {
    name: string
    relationship: string
    contact: string
  }
  trustedContact: {
    name: string
    role: string
    email: string
  }
  lifeTrigger: {
    type: string
    timing: string
  }
}

export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    assets: [],
    firstAsset: { name: '', type: '', value: '', status: 'not-verified' },
    beneficiary: { name: '', relationship: '', contact: '' },
    trustedContact: { name: '', role: '', email: '' },
    lifeTrigger: { type: '', timing: '' }
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 7

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 2:
        if (data.assets.length === 0) {
          newErrors.assets = 'Please select at least one asset type'
        }
        break
      case 3:
        if (!data.firstAsset.name.trim()) {
          newErrors.assetName = 'Asset name is required'
        }
        if (!data.firstAsset.type) {
          newErrors.assetType = 'Asset type is required'
        }
        break
      case 4:
        if (!data.beneficiary.name.trim()) {
          newErrors.beneficiaryName = 'Beneficiary name is required'
        }
        if (!data.beneficiary.relationship) {
          newErrors.beneficiaryRelationship = 'Relationship is required'
        }
        break
      case 5:
        if (!data.trustedContact.name.trim()) {
          newErrors.trustedContactName = 'Trusted contact name is required'
        }
        if (!data.trustedContact.role) {
          newErrors.trustedContactRole = 'Role is required'
        }
        if (!data.trustedContact.email.trim()) {
          newErrors.trustedContactEmail = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(data.trustedContact.email)) {
          newErrors.trustedContactEmail = 'Please enter a valid email'
        }
        break
      case 6:
        if (!data.lifeTrigger.type) {
          newErrors.lifeTriggerType = 'Trigger type is required'
        }
        if (!data.lifeTrigger.timing) {
          newErrors.lifeTriggerTiming = 'Trigger timing is required'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleAssetToggle = (asset: string) => {
    setData(prev => ({
      ...prev,
      assets: prev.assets.includes(asset)
        ? prev.assets.filter(a => a !== asset)
        : [...prev.assets, asset]
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Let's secure your legacy.</h1>
              <p className="text-muted-foreground text-lg">In just a few steps, we'll get your digital estate ready.</p>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Blockchain secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Immutable records</span>
              </div>
            </div>
            <Button onClick={nextStep} className="w-full max-w-sm" size="lg">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">What do you want to protect?</h2>
              <p className="text-muted-foreground">Select all that apply to get started.</p>
            </div>
            <div className="space-y-4">
              {[
                { id: 'cryptocurrency', label: 'Cryptocurrency', icon: Wallet },
                { id: 'financial', label: 'Financial Accounts', icon: CreditCard },
                { id: 'real-estate', label: 'Real Estate', icon: Home },
                { id: 'online', label: 'Online Accounts / Passwords', icon: Key },
                { id: 'other', label: 'Other Assets', icon: Plus }
              ].map((asset) => (
                <div
                  key={asset.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    data.assets.includes(asset.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleAssetToggle(asset.id)}
                >
                  <Checkbox
                    checked={data.assets.includes(asset.id)}
                    onChange={() => handleAssetToggle(asset.id)}
                  />
                  <asset.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{asset.label}</span>
                </div>
              ))}
            </div>
            {errors.assets && (
              <p className="text-destructive text-sm">{errors.assets}</p>
            )}
            <Button onClick={nextStep} className="w-full" disabled={data.assets.length === 0}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Add your first asset</h2>
              <p className="text-muted-foreground">We'll help you add more assets later.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetName">Asset Name</Label>
                <Input
                  id="assetName"
                  placeholder="e.g., Bitcoin Wallet, Chase Checking"
                  value={data.firstAsset.name}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    firstAsset: { ...prev.firstAsset, name: e.target.value }
                  }))}
                  className={errors.assetName ? 'border-destructive' : ''}
                />
                {errors.assetName && (
                  <p className="text-destructive text-sm">{errors.assetName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type</Label>
                <Select
                  value={data.firstAsset.type}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    firstAsset: { ...prev.firstAsset, type: value }
                  }))}
                >
                  <SelectTrigger className={errors.assetType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                    <SelectItem value="bank-account">Bank Account</SelectItem>
                    <SelectItem value="investment">Investment Account</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="online-account">Online Account</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.assetType && (
                  <p className="text-destructive text-sm">{errors.assetType}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="assetValue">Estimated Value (optional)</Label>
                <Input
                  id="assetValue"
                  placeholder="$0.00"
                  value={data.firstAsset.value}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    firstAsset: { ...prev.firstAsset, value: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-2">
                  <Badge variant={data.firstAsset.status === 'verified' ? 'default' : 'secondary'}>
                    {data.firstAsset.status === 'verified' ? 'Verified' : 'Not yet'}
                  </Badge>
                </div>
              </div>
            </div>
            <Button onClick={nextStep} className="w-full">
              Save & Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Choose a beneficiary</h2>
              <p className="text-muted-foreground">Who should receive your assets when the time comes?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="beneficiaryName">Full Name</Label>
                <Input
                  id="beneficiaryName"
                  placeholder="Enter beneficiary's full name"
                  value={data.beneficiary.name}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    beneficiary: { ...prev.beneficiary, name: e.target.value }
                  }))}
                  className={errors.beneficiaryName ? 'border-destructive' : ''}
                />
                {errors.beneficiaryName && (
                  <p className="text-destructive text-sm">{errors.beneficiaryName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={data.beneficiary.relationship}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    beneficiary: { ...prev.beneficiary, relationship: value }
                  }))}
                >
                  <SelectTrigger className={errors.beneficiaryRelationship ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.beneficiaryRelationship && (
                  <p className="text-destructive text-sm">{errors.beneficiaryRelationship}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="beneficiaryContact">Email or Phone (optional)</Label>
                <Input
                  id="beneficiaryContact"
                  placeholder="Contact information"
                  value={data.beneficiary.contact}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    beneficiary: { ...prev.beneficiary, contact: e.target.value }
                  }))}
                />
              </div>
            </div>
            <Button onClick={nextStep} className="w-full">
              Add Beneficiary
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Trusted Contact Setup</h2>
              <p className="text-muted-foreground">Your Trusted Contact can help manage your legacy when life triggers occur.</p>
            </div>
            <div className="bg-info/10 p-4 rounded-lg border border-info/20">
              <div className="flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-info mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-info">What is a Trusted Contact?</p>
                  <p className="text-info/80 mt-1">They'll receive notifications about your estate and can help verify life events when needed.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trustedContactName">Full Name</Label>
                <Input
                  id="trustedContactName"
                  placeholder="Enter trusted contact's name"
                  value={data.trustedContact.name}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    trustedContact: { ...prev.trustedContact, name: e.target.value }
                  }))}
                  className={errors.trustedContactName ? 'border-destructive' : ''}
                />
                {errors.trustedContactName && (
                  <p className="text-destructive text-sm">{errors.trustedContactName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustedContactRole">Role</Label>
                <Select
                  value={data.trustedContact.role}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    trustedContact: { ...prev.trustedContact, role: value }
                  }))}
                >
                  <SelectTrigger className={errors.trustedContactRole ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executor">Executor</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                  </SelectContent>
                </Select>
                {errors.trustedContactRole && (
                  <p className="text-destructive text-sm">{errors.trustedContactRole}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="trustedContactEmail">Email</Label>
                <Input
                  id="trustedContactEmail"
                  type="email"
                  placeholder="Enter email address"
                  value={data.trustedContact.email}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    trustedContact: { ...prev.trustedContact, email: e.target.value }
                  }))}
                  className={errors.trustedContactEmail ? 'border-destructive' : ''}
                />
                {errors.trustedContactEmail && (
                  <p className="text-destructive text-sm">{errors.trustedContactEmail}</p>
                )}
              </div>
            </div>
            <Button onClick={nextStep} className="w-full">
              Invite
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Set a Life Trigger</h2>
              <p className="text-muted-foreground">When should your estate plan activate?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="triggerType">Type</Label>
                <Select
                  value={data.lifeTrigger.type}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    lifeTrigger: { ...prev.lifeTrigger, type: value }
                  }))}
                >
                  <SelectTrigger className={errors.lifeTriggerType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select trigger type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inactivity">Inactivity</SelectItem>
                    <SelectItem value="medical">Medical Event</SelectItem>
                    <SelectItem value="death">Death Certificate</SelectItem>
                  </SelectContent>
                </Select>
                {errors.lifeTriggerType && (
                  <p className="text-destructive text-sm">{errors.lifeTriggerType}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="triggerTiming">Trigger Timing</Label>
                <Select
                  value={data.lifeTrigger.timing}
                  onValueChange={(value) => setData(prev => ({
                    ...prev,
                    lifeTrigger: { ...prev.lifeTrigger, timing: value }
                  }))}
                >
                  <SelectTrigger className={errors.lifeTriggerTiming ? 'border-destructive' : ''}>
                    <SelectValue placeholder="e.g. 30 days after no login" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-days">30 days after no login</SelectItem>
                    <SelectItem value="60-days">60 days after no login</SelectItem>
                    <SelectItem value="90-days">90 days after no login</SelectItem>
                    <SelectItem value="immediate">Immediately upon verification</SelectItem>
                  </SelectContent>
                </Select>
                {errors.lifeTriggerTiming && (
                  <p className="text-destructive text-sm">{errors.lifeTriggerTiming}</p>
                )}
              </div>
            </div>
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-success mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-success">Blockchain Security</p>
                  <p className="text-success/80 mt-1">Your triggers are cryptographically secured and cannot be tampered with.</p>
                </div>
              </div>
            </div>
            <Button onClick={nextStep} className="w-full">
              Activate Trigger
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      case 7:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">You're all set.</h1>
              <p className="text-muted-foreground text-lg">Welcome to your dashboard. Your legacy is now in motion.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assets Protected</span>
                  <Badge variant="secondary">1</Badge>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Beneficiaries</span>
                  <Badge variant="secondary">1</Badge>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Trusted Contacts</span>
                  <Badge variant="secondary">1</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Estate secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Legacy protected</span>
                </div>
              </div>
            </div>
            <Button onClick={() => window.location.href = '/dashboard'} className="w-full max-w-sm" size="lg">
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#4A4A68]">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-[#4A4A68]">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Step content */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="transition-all duration-300 ease-in-out">
              {renderStep()}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep > 1 && currentStep < 7 && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-[#4A4A68] hover:text-[#1E1E2F]"
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}