"use client";

import { Users, User, ShieldCheck, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoginFormProps {
  onLoginSuccess: (data: { role: "owner" | "guardian" | "executor" }) => void;
  onBackToLanding: () => void;
  onForgotPassword: () => void;
  onSignUpClick: () => void;
}

export const LoginForm = ({
  onLoginSuccess,
  onBackToLanding,
  onForgotPassword,
  onSignUpClick,
}: LoginFormProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-none bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToLanding}
                className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E2F] text-center pb-2 tracking-tight leading-tight">
              Welcome back!
            </h1>
            <p className="text-center text-[#4A4A68] text-base font-medium">
              Choose how you'd like to log in:
            </p>
          </CardHeader>

          <CardContent className="space-y-8 py-6">
            {/* Card Stack of Login Options */}
            <div className="flex flex-col gap-7">
              {/* Owner Option */}
              <Button
                className="relative w-full flex-col items-center justify-center p-0 rounded-2xl bg-gradient-to-tr from-[#FFEDD6] via-[#FFF9F6] to-[#FFD1C7] border-2 border-[#FF6B57]/30 shadow-none hover:shadow-xl hover:scale-[1.04] hover:border-[#FF6B57]/60 focus-visible:ring-4 focus-visible:ring-[#FFBCA4]/30 transition-all overflow-hidden group min-h-[152px] ring-0"
                onClick={() => onLoginSuccess({ role: "owner" })}
                aria-label="Log In to Secure Your Legacy"
              >
                {/* Subtle glowing ring accent on hover */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-[radial-gradient(circle_at_60%_40%,rgba(255,107,87,0.08)_0%,rgba(255,255,255,0.0)_65%)]"></span>
                <div className="flex flex-col items-center justify-center w-full p-6 gap-3">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF6B57]/10 border border-[#FF6B57]/40 shadow-md mb-2 ring-0 group-hover:shadow-lg group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#FF6B57]/30 transition-transform">
                    <User className="w-9 h-9 text-[#FF6B57] drop-shadow-[0_1px_2px_rgba(255,107,87,0.10)]" />
                  </div>
                  <div className="flex flex-col items-center gap-1 w-full">
                    <div className="text-lg md:text-xl font-semibold text-[#1E1E2F] text-center tracking-tight leading-snug">
                      Log In to Secure Your Legacy
                    </div>
                    <div className="text-[#4A4A68] text-sm text-center max-w-[250px] pb-1 leading-snug font-normal">
                      For individuals managing their own estate plan
                    </div>
                  </div>
                </div>
              </Button>

              {/* Guardian Option */}
              <Button
                className="relative w-full flex-col items-center justify-center p-0 rounded-2xl bg-gradient-to-tr from-[#D0F2FC] via-[#F6FFFB] to-[#F2F4F7] border-2 border-[#62B6F0]/30 shadow-none hover:shadow-xl hover:scale-[1.04] hover:border-[#62B6F0]/60 focus-visible:ring-4 focus-visible:ring-[#62B6F0]/20 transition-all overflow-hidden group min-h-[152px] ring-0"
                onClick={() => onLoginSuccess({ role: "guardian" })}
                aria-label="Log in as a Guardian"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-[radial-gradient(circle_at_60%_40%,rgba(98,182,240,0.08)_0%,rgba(255,255,255,0.0)_65%)]"></span>
                <div className="flex flex-col items-center justify-center w-full p-6 gap-3">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#62B6F0]/10 border border-[#62B6F0]/35 shadow-md mb-2 ring-0 group-hover:shadow-lg group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#62B6F0]/30 transition-transform">
                    <Shield className="w-9 h-9 text-[#62B6F0] drop-shadow-[0_1px_2px_rgba(98,182,240,0.10)]" />
                  </div>
                  <div className="flex flex-col items-center gap-1 w-full">
                    <div className="text-lg md:text-xl font-semibold text-[#1E1E2F] text-center tracking-tight leading-snug">
                      Log in as a Guardian
                    </div>
                    <div className="text-[#4A4A68] text-sm text-center max-w-[250px] pb-1 leading-snug font-normal">
                      For trusted Guardians designated to safeguard assets or wishes
                    </div>
                  </div>
                </div>
              </Button>

              {/* Executor Option */}
              <Button
                className="relative w-full flex-col items-center justify-center p-0 rounded-2xl bg-gradient-to-tl from-[#FFDCDD] via-[#FFF9F6] to-[#FFE9EC] border-2 border-[#FF3D3D]/30 shadow-none hover:shadow-xl hover:scale-[1.04] hover:border-[#FF3D3D]/60 focus-visible:ring-4 focus-visible:ring-[#FF3D3D]/20 transition-all overflow-hidden group min-h-[152px] ring-0"
                onClick={() => onLoginSuccess({ role: "executor" })}
                aria-label="Log in as an Executor"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-[radial-gradient(circle_at_60%_40%,rgba(255,61,61,0.13)_0%,rgba(255,255,255,0.0)_60%)]"></span>
                <div className="flex flex-col items-center justify-center w-full p-6 gap-3">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF3D3D]/10 border border-[#FF3D3D]/35 shadow-md mb-2 ring-0 group-hover:shadow-lg group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#FF3D3D]/30 transition-transform">
                    <ShieldCheck className="w-9 h-9 text-[#FF3D3D] drop-shadow-[0_1px_2px_rgba(255,61,61,0.10)]" />
                  </div>
                  <div className="flex flex-col items-center gap-1 w-full">
                    <div className="text-lg md:text-xl font-semibold text-[#1E1E2F] text-center tracking-tight leading-snug">
                      Log in as an Executor
                    </div>
                    <div className="text-[#4A4A68] text-sm text-center max-w-[250px] pb-1 leading-snug font-normal">
                      For Executors appointed to carry out final estate instructions
                    </div>
                  </div>
                </div>
              </Button>
            </div>

            {/* Signup option */}
            <div className="text-center pt-5">
              <p className="text-sm text-[#4A4A68]">
                Don&apos;t have an account?{' '}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onSignUpClick}
                  className="p-0 h-auto text-primary hover:text-primary/80 font-medium"
                >
                  Sign up
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};