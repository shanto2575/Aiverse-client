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
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, ShieldCheck, Zap } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log(user)

    await authClient.signUp.email({
      ...user,
      plan: "free",
    });

    router.push("/");
  };

  return (
    <div className="w-full min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto px-4 py-6">
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:col-span-6 space-y-8 pr-0 lg:pr-8"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#2c221e]/5 border border-[#dfcbaf] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join the Next-Gen AI Hub</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#2c221e] leading-tight">
            Unlock the Power of Engineered Prompts
          </h1>
          <p className="text-base text-[#2c221e]/80 leading-relaxed">
            Discover, bookmark, and share premium AI prompts for ChatGPT, Midjourney, Claude, and more. Elevate your workflows instantly.
          </p>
        </div>

        <div className="space-y-4 border-t border-[#dfcbaf] pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#2c221e]/5 border border-[#dfcbaf] rounded-lg mt-1">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2c221e]">Curated Platform</h4>
              <p className="text-xs text-[#2c221e]/70">Access heavily moderated, high-converting prompts.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#2c221e]/5 border border-[#dfcbaf] rounded-lg mt-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2c221e]">Secure & Advanced</h4>
              <p className="text-xs text-[#2c221e]/70">JWT-based protection with granular role management.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#2c221e]/5 border border-[#dfcbaf] rounded-lg mt-1">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2c221e]">Developer Marketplace</h4>
              <p className="text-xs text-[#2c221e]/70">Monetize premium features or integrate natively.</p>
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
            <Form onSubmit={onSubmit} className="space-y-6">
              <Fieldset className="w-full space-y-4">
                <div>
                  <Fieldset.Legend className="text-2xl font-black text-[#2c221e]">
                    Create Account
                  </Fieldset.Legend>
                  <Description className="text-sm text-[#2c221e]/70 mt-1">
                    Get started with your free tier access today.
                  </Description>
                </div>

                <Fieldset.Group className="space-y-4">
                  <TextField isRequired name="name" className="w-full">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#2c221e]/80 mb-1.5">Name</Label>
                    <Input 
                      placeholder="John Doe" 
                      className="w-full bg-transparent border border-[#dfcbaf] text-[#2c221e] placeholder-[#2c221e]/40 rounded-xl px-4 py-2.5 focus:border-[#2c221e] focus:ring-1 focus:ring-[#2c221e] outline-none text-sm transition-all"
                    />
                    <FieldError className="text-xs text-red-600 mt-1" />
                  </TextField>

                  <TextField name="image" type="url" className="w-full">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#2c221e]/80 mb-1.5">Image URL</Label>
                    <Input 
                      placeholder="https://example.com/avatar.jpg" 
                      className="w-full bg-transparent border border-[#dfcbaf] text-[#2c221e] placeholder-[#2c221e]/40 rounded-xl px-4 py-2.5 focus:border-[#2c221e] focus:ring-1 focus:ring-[#2c221e] outline-none text-sm transition-all"
                    />
                    <FieldError className="text-xs text-red-600 mt-1" />
                  </TextField>

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
                  className="w-full bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] font-bold py-3 px-4 rounded-xl shadow-md transform active:scale-[0.98] transition-all text-sm mt-4"
                >
                  Sign Up
                </Button>
              </Fieldset>
            </Form>
          </Surface>
        </div>
      </motion.div>

    </div>
  );
}