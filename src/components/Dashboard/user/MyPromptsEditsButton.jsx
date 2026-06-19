"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { ArrowUpRight, Eye, Pencil } from "lucide-react";
import React, { useState } from "react";
import { authClient } from '@/lib/auth-client';
import { EditsPrompt } from "@/lib/api/user/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MyPromptsEditsButton = ({ item }) => {
    const [visibility, setVisibility] = useState("public");
    // console.log(item)
    const { data: session } = authClient.useSession()
    // console.log(session)
    const user = session?.user;
    const router=useRouter()

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());


        const result = await EditsPrompt(data, item._id)
        // console.log(result,'update')
        if (result.modifiedCount > 0) {
            toast.success("Updated successfully");
            router.refresh();
        }
    }
    const baseInputStyle = "w-full bg-[#ebdcc9]/40 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3 appearance-none cursor-pointer";

    return (
        <Modal>
            <Modal.Trigger>
                <button
                    className="p-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] rounded-xl transition-all duration-200 shadow-sm active:scale-95"
                    title="Edit"
                >
                    <Pencil size={13} />
                </button>
            </Modal.Trigger>

            <Modal.Backdrop className="backdrop-blur-md bg-black/20 transition-all duration-300">
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-4xl bg-[#ebdcc9] border border-[#dfcbaf] shadow-2xl rounded-2xl">
                        <Modal.CloseTrigger className="text-[#2c221e]/60 hover:text-[#2c221e]" />
                        <Modal.Header className="flex flex-col gap-1">
                            <Modal.Icon className="bg-[#2c221e]/10 text-[#2c221e]">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                        </Modal.Header>
                        <Modal.Body className="p-6 bg-[#ebdcc9]">
                            <Surface variant="default" className="bg-transparent shadow-none p-0">
                                <form onSubmit={onSubmit} className="flex flex-col gap-5">

                                    {/* PROMPT TITLE */}
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                            Prompt Title *
                                        </label>
                                        <input
                                            defaultValue={item.title}
                                            required
                                            name="title"
                                            type="text"
                                            placeholder="e.g. Optimized React Tailwind Card Builder"
                                            className="w-full bg-[#ebdcc9]/40 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3 placeholder-[#2c221e]/40"
                                        />
                                    </div>

                                    {/* SHORT DESCRIPTION */}
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                            Short Description *
                                        </label>
                                        <input
                                            defaultValue={item.shortDescription}
                                            required
                                            name="shortDescription"
                                            type="text"
                                            placeholder="Explain what this prompt accomplishes in 1-2 sentences"
                                            className="w-full bg-[#ebdcc9]/40 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3 placeholder-[#2c221e]/40"
                                        />
                                    </div>

                                    {/* PROMPT CONTENT TEMPLATE */}
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                            Prompt Content Template *
                                        </label>
                                        <textarea
                                            defaultValue={item.description}
                                            required
                                            name="description"
                                            placeholder="Write the full, detailed prompt instructions. Use brackets to indicate variables e.g., 'Act as a [role]...'"
                                            className="w-full bg-[#ebdcc9]/40 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 min-h-[110px] p-4 resize-y placeholder-[#2c221e]/40"
                                        />
                                    </div>

                                    {/* DYNAMIC DROPDOWN SELECT MATRIX (CATEGORY & AI ENGINE) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                                Category *
                                            </label>
                                            <div className="relative">
                                                <select required name="category" className={baseInputStyle} defaultValue={item.category}>
                                                    <option value="coding" className="bg-[#ebdcc9] text-[#2c221e]">Coding</option>
                                                    <option value="writing" className="bg-[#ebdcc9] text-[#2c221e]">Creative Writing</option>
                                                    <option value="seo" className="bg-[#ebdcc9] text-[#2c221e]">SEO & Marketing</option>
                                                    <option value="design" className="bg-[#ebdcc9] text-[#2c221e]">UI/UX Design</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2c221e]/60">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                                AI Engine *
                                            </label>
                                            <div className="relative">
                                                <select required name="aiEngine" className={baseInputStyle} defaultValue={item.aiEngine}>
                                                    <option value="chatgpt" className="bg-[#ebdcc9] text-[#2c221e]">ChatGPT</option>
                                                    <option value="claude" className="bg-[#ebdcc9] text-[#2c221e]">Claude 3.5 Sonnet</option>
                                                    <option value="gemini" className="bg-[#ebdcc9] text-[#2c221e]">Gemini Pro</option>
                                                    <option value="midjourney" className="bg-[#ebdcc9] text-[#2c221e]">Midjourney v6</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2c221e]/60">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PARALLEL ROW: DIFFICULTY LEVEL & VISIBILITY STATUS */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                                Difficulty Level *
                                            </label>
                                            <div className="relative">
                                                <select required name="difficulty" className={baseInputStyle}
                                                    defaultValue={item.difficulty}>
                                                    <option value="beginner" className="bg-[#ebdcc9] text-[#2c221e]">Beginner</option>
                                                    <option value="intermediate" className="bg-[#ebdcc9] text-[#2c221e]">Intermediate</option>
                                                    <option value="advanced" className="bg-[#ebdcc9] text-[#2c221e]">Advanced</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2c221e]/60">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-3 block">
                                                Visibility Status *
                                            </label>
                                            <div className="flex flex-wrap items-center gap-6 pt-1">
                                                <label className="flex items-center gap-2 text-sm font-medium text-[#2c221e] cursor-pointer select-none">
                                                    <input

                                                        type="radio"
                                                        name="visibility"
                                                        value="public"
                                                        checked={visibility === "public"}
                                                        onChange={() => setVisibility("public")}
                                                        className="accent-[#2c221e] h-4 w-4"
                                                    />
                                                    <span>Public (Free access)</span>
                                                </label>

                                                <label className="flex items-center gap-2 text-sm font-medium text-[#2c221e] cursor-pointer select-none">
                                                    <input

                                                        type="radio"
                                                        name="visibility"
                                                        value="private"
                                                        checked={visibility === "private"}
                                                        onChange={() => setVisibility("private")}
                                                        className="accent-[#2c221e] h-4 w-4"
                                                    />
                                                    <span>Private (Premium lock)</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* TAGS (COMMA-SEPARATED) */}
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                            Tags (Comma-Separated)
                                        </label>
                                        <input
                                            defaultValue={item.tags}
                                            name="tags"
                                            type="text"
                                            placeholder="e.g. tailwind, card, component, responsive"
                                            className="w-full bg-[#ebdcc9]/40 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3 placeholder-[#2c221e]/40"
                                        />
                                    </div>

                                    {/* Submission Button Panel */}
                                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#dfcbaf] mt-2">
                                        <Button
                                            type="submit"
                                            slot={'close'}
                                            className="w-full bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] font-bold uppercase tracking-widest h-12 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 group text-xs cursor-pointer"
                                        >
                                            Edits Prompts
                                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Button>
                                    </div>

                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default MyPromptsEditsButton;