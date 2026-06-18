"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import React from "react";
import { motion } from "motion/react";
import { Sparkles, KeyRound, Eye, Globe } from "lucide-react";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="w-full min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto px-4 py-6">
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:col-span-6 space-y-6 pr-0 lg:pr-8"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#2c221e]/5 border border-[#dfcbaf] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Back to Alverse</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#2c221e] leading-tight">
            Deploy Smarter Workflows Instantly
          </h1>
          <p className="text-base text-[#2c221e]/80 leading-relaxed">
            Log in to manage your private prompt repository, sync bookmarks, interact with top-tier creators, and unlock premium features.
          </p>
        </div>

        <div className="space-y-4 border-t border-[#dfcbaf] pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#2c221e]/5 border border-[#dfcbaf] rounded-lg mt-1">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2c221e]">Granular Sessions</h4>
              <p className="text-xs text-[#2c221e]/70">Secure access control using JWT tokens and continuous session management.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#2c221e]/5 border border-[#dfcbaf] rounded-lg mt-1">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2c221e]">Tailored Insights</h4>
              <p className="text-xs text-[#2c221e]/70">Check analytical data, copy counters, and bookmark growth dynamically.</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="lg:col-span-6 w-full"
      >
        <div className="bg-[#ebdcc9] border border-[#dfcbaf] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <Surface className="w-full bg-transparent">
            <Form onSubmit={onSubmit} className="space-y-5">
              <Fieldset className="w-full space-y-4">
                <div>
                  <Fieldset.Legend className="text-2xl font-black text-[#2c221e]">
                    Sign In
                  </Fieldset.Legend>
                  <Description className="text-sm text-[#2c221e]/70 mt-1">
                    Access your curated AI prompt marketplace profile.
                  </Description>
                </div>

                <Fieldset.Group className="space-y-4">
                  <TextField isRequired name="email" type="email" className="w-full">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#2c221e]/80 mb-1.5">Email</Label>
                    <Input 
                      placeholder="john@example.com" 
                      className="w-full bg-transparent border border-[#dfcbaf] text-[#2c221e] placeholder-[#2c221e]/40 rounded-xl px-4 py-2.5 focus:border-[#2c221e] focus:ring-1 focus:ring-[#2c221e] outline-none text-sm transition-all"
                    />
                    <FieldError className="text-xs text-red-600 mt-1" />
                  </TextField>

                  <TextField isRequired name="password" type="password">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#2c221e]/80 mb-1.5">Password</Label>
                    <Input 
                      placeholder="••••••••" 
                      className="w-full bg-transparent border border-[#dfcbaf] text-[#2c221e] placeholder-[#2c221e]/40 rounded-xl px-4 py-2.5 focus:border-[#2c221e] focus:ring-1 focus:ring-[#2c221e] outline-none text-sm transition-all"
                    />
                    <FieldError className="text-xs text-red-600 mt-1" />
                  </TextField>
                </Fieldset.Group>

                <Button 
                  type="submit" 
                  className="w-full bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] font-bold py-3 px-4 rounded-xl shadow-md transform active:scale-[0.98] transition-all text-sm mt-2"
                >
                  Sign In
                </Button>
              </Fieldset>
            </Form>

            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dfcbaf]"></div>
              </div>
              <span className="relative bg-[#ebdcc9] px-3 text-xs font-bold uppercase tracking-wider text-[#2c221e]/60">
                Or Continue With
              </span>
            </div>

            <Button 
              onClick={handleGoogleLogin}
              className="w-full bg-transparent border border-[#2c221e]/20 text-[#2c221e] hover:bg-[#2c221e]/5 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>Google Account</span>
            </Button>
          </Surface>
        </div>
      </motion.div>

    </div>
  );
}