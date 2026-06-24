import { CheckCircle2, BookOpen } from "lucide-react";
import Link from "next/link";

export default function PromptEngineeringSection() {
    return (
        <section className="bg-[#ebdcc9] py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Content */}
                <div>
                    <span className="text-[#78541c] uppercase font-bold tracking-[0.25em] text-xs md:text-sm">
                        Master the Art of AI
                    </span>

                    <h2 className="mt-4 md:mt-6 text-3xl md:text-5xl lg:text-6xl font-black text-[#2c221e] leading-tight">
                        Crafting High-Yield AI Prompts
                    </h2>

                    <p className="mt-4 md:mt-6 text-[#2c221e]/70 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                        Talking to AI is easy, but getting predictable, production-ready output is a science. 
                        Our curated architecture ensures your instructions align perfectly with LLM reasoning.
                    </p>

                    <div className="mt-8 md:mt-10 space-y-6 md:space-y-8">

                        <div className="flex gap-4">
                            <CheckCircle2 className="text-[#344a32] shrink-0 mt-1" />
                            <div>
                                <h4 className="text-[#2c221e] font-bold text-base md:text-lg">
                                    System Role-Play:
                                </h4>
                                <p className="text-[#2c221e]/80 mt-1 text-sm md:text-base">
                                    Establish strict behavioral boundaries by defining an expert persona for the LLM.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle2 className="text-[#344a32] shrink-0 mt-1" />
                            <div>
                                <h4 className="text-[#2c221e] font-bold text-base md:text-lg">
                                    Few-Shot Prompting:
                                </h4>
                                <p className="text-[#2c221e]/80 mt-1 text-sm md:text-base">
                                    Inject high-quality input-output examples directly into the template for consistent results.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle2 className="text-[#344a32] shrink-0 mt-1" />
                            <div>
                                <h4 className="text-[#2c221e] font-bold text-base md:text-lg">
                                    Deterministic Controls:
                                </h4>
                                <p className="text-[#2c221e]/80 mt-1 text-sm md:text-base">
                                    Fine-tune structural output formats and strictly limit tokens to bypass AI hallucinations.
                                </p>
                            </div>
                        </div>

                    </div>

                    <Link href="/all-prompts" className="inline-block w-full sm:w-auto">
                        <button className="mt-8 md:mt-10 w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#2c221e] to-[#42342e] text-[#ebdcc9] font-bold shadow-[0_4px_20px_rgba(44,34,30,0.25)] hover:scale-105 transition-all duration-300 cursor-pointer">
                            <BookOpen size={18} />
                            Explore Premium Marketplace
                        </button>
                    </Link>
                </div>

                {/* Right Code Card */}
                <div className="relative w-full">
                    <div className="rounded-3xl border border-[#dfcbaf] bg-[#f5ebd7]/60 overflow-hidden shadow-xl backdrop-blur-sm">

                        {/* Top Bar / Header */}
                        <div className="flex items-center gap-2 px-4 md:px-6 py-4 border-b border-[#dfcbaf]">
                            <div className="w-3 h-3 rounded-full bg-[#823324]/40" />
                            <div className="w-3 h-3 rounded-full bg-[#bfa054]/40" />
                            <div className="w-3 h-3 rounded-full bg-[#344a32]/40" />

                            <span className="ml-4 text-[#2c221e]/50 text-xs md:text-sm font-mono">
                                ai_system_schema.json
                            </span>
                        </div>

                        {/* Code Display */}
                        <pre className="p-5 md:p-8 overflow-x-auto text-xs md:text-sm font-mono leading-7 md:leading-8 text-[#78541c]">
                            {`{
  "system_instruction": "Act as an Expert AI Prompt Engineer",
  "objective": "Optimize text generation for commercial LLMs",
  "constraints": {
    "avoid_hallucinations": true,
    "enforce_json_schema": true,
    "max_tokens_budget": 2048
  },
  "few_shot_examples": [
    { "input": "raw_idea", "output": "structured_payload" }
  ],
  "response_format": "application/json",
  "hyperparameters": {
    "temperature": 0.15,
    "top_p": 0.9
  }
}`}
                        </pre>
                    </div>
                </div>

            </div>
        </section>
    );
}