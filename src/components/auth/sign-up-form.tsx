"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Eye, EyeOff, Lock, ChevronDown, ChevronRight, FileText, Shield, UserCheck, Key, FileHeart } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  agreeToTerms: boolean;
  understandAccount: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  agreeToTerms?: string;
  understandAccount?: string;
}

interface SignUpFormProps {
  onSignUpSuccess?: () => void;
  onBackToLanding?: () => void;
}

export const SignUpForm = ({ onSignUpSuccess, onBackToLanding }: SignUpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    agreeToTerms: false,
    understandAccount: false
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [whyWeAskExpanded, setWhyWeAskExpanded] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validatePassword = (password: string): boolean => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;
    return hasUppercase && hasLowercase && hasNumber && hasMinLength;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      errors.fullName = 'Please enter your full name (first and last name)';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }

    // Checkbox validations
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the Terms and Privacy Policy';
    }

    if (!formData.understandAccount) {
      errors.understandAccount = 'You must acknowledge the account purpose';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful submission
      console.log('Form submitted successfully:', formData);
      
      // Navigate to onboarding or dashboard
      if (onSignUpSuccess) {
        onSignUpSuccess();
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];
    
    strength = checks.filter(Boolean).length;
    
    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg mx-auto shadow-lg border-0 bg-white">
        <CardContent className="p-8">
          {/* Back button */}
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="mb-4 text-sm text-[#4A4A68] hover:text-[#FF6B57] transition-colors"
            >
              ← Back to Home
            </button>
          )}

          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1E1E2F] mb-3">
              Let's Protect What Matters Most
            </h1>
            <p className="text-sm text-[#4A4A68] leading-relaxed">
              Create your OMRA account to secure your legacy, activate life-trigger monitoring, and manage your inheritance plan with full control. Your identity is essential to ensure that only you — or someone you trust — can ever activate your plan.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-[#FF6B57]" />
              <h2 className="text-lg font-semibold text-[#1E1E2F]">Create Your Account</h2>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-[#1E1E2F]">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`bg-[#F2F4F7] border-[#F2F4F7] focus:border-[#FF6B57] focus:ring-[#FF6B57] ${
                  formErrors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Enter your full name"
              />
              {formErrors.fullName && (
                <p className="text-sm text-red-500">{formErrors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#1E1E2F]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`bg-[#F2F4F7] border-[#F2F4F7] focus:border-[#FF6B57] focus:ring-[#FF6B57] ${
                  formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-[#1E1E2F]">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`bg-[#F2F4F7] border-[#F2F4F7] focus:border-[#FF6B57] focus:ring-[#FF6B57] ${
                  formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Enter your phone number"
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500">{formErrors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#1E1E2F]">
                Create Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`bg-[#F2F4F7] border-[#F2F4F7] focus:border-[#FF6B57] focus:ring-[#FF6B57] pr-10 ${
                    formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4A4A68] hover:text-[#FF6B57] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#4A4A68]">{passwordStrength.label}</span>
                  </div>
                </div>
              )}
              
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="agreeToTerms" className="text-sm text-[#1E1E2F] leading-relaxed">
                    I agree to OMRA's Terms and Privacy Policy
                  </Label>
                  {formErrors.agreeToTerms && (
                    <p className="text-sm text-red-500">{formErrors.agreeToTerms}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="understandAccount"
                  checked={formData.understandAccount}
                  onCheckedChange={(checked) => handleInputChange('understandAccount', checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="understandAccount" className="text-sm text-[#1E1E2F] leading-relaxed">
                    I understand this account will be used to manage sensitive inheritance and legal preferences
                  </Label>
                  {formErrors.understandAccount && (
                    <p className="text-sm text-red-500">{formErrors.understandAccount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF6B57] hover:bg-[#FF3D3D] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Secure My Legacy'}
            </Button>
          </form>

          {/* Collapsible Section */}
          <div className="mt-8">
            <Collapsible open={whyWeAskExpanded} onOpenChange={setWhyWeAskExpanded}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left hover:text-[#FF6B57] transition-colors">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium text-[#1E1E2F]">Why We Ask</span>
                {whyWeAskExpanded ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-[#FF6B57] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#4A4A68]">
                    To protect your inheritance with bank-grade security
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck className="w-4 h-4 text-[#FF6B57] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#4A4A68]">
                    To verify your identity if life triggers are missed
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Key className="w-4 h-4 text-[#FF6B57] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#4A4A68]">
                    To give your assigned lawyer or executor the ability to act on your behalf, only when needed
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FileHeart className="w-4 h-4 text-[#FF6B57] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#4A4A68]">
                    To encrypt and store your wishes, assets, and instructions privately
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};