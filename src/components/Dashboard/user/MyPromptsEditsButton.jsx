"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { ArrowUpRight, Eye, Pencil } from "lucide-react";

const MyPromptsEditsButton = ({ prompts }) => {
    const [visibility, setVisibility] = useState("public");
    
    // console.log(prompts)

    const baseInputStyle = "w-full bg-[#ebdcc9]/20 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3 appearance-none cursor-pointer";
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
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="flex flex-col gap-5">

                                    {/* PROMPT TITLE */}
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                            Prompt Title *
                                        </label>
                                        <input
                                            required
                                            name="title"
                                            type="text"
                                            placeholder="e.g. Optimized React Tailwind Card Builder"
                                            className="w-full bg-[#ebdcc9]/20 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3"
                                        />
                                    </div>

                                    {/* SHORT DESCRIPTION */}
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                            Short Description *
                                        </label>
                                        <input
                                            required
                                            name="shortDescription"
                                            type="text"
                                            placeholder="Explain what this prompt accomplishes in 1-2 sentences"
                                            className="w-full bg-[#ebdcc9]/20 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3"
                                        />
                                    </div>

                                    {/* PROMPT CONTENT TEMPLATE */}
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                            Prompt Content Template *
                                        </label>
                                        <textarea
                                            required
                                            name="description"
                                            placeholder="Write the full, detailed prompt instructions. Use brackets to indicate variables e.g., 'Act as a [role]...'"
                                            className="w-full bg-[#ebdcc9]/20 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 min-h-[110px] p-4 resize-y"
                                        />
                                    </div>

                                    {/* DYNAMIC DROPDOWN SELECT MATRIX (CATEGORY & AI ENGINE) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-1.5 block">
                                                Category *
                                            </label>
                                            <div className="relative">
                                                <select required name="category" className={baseInputStyle}>
                                                    <option value="coding" className="bg-[#ebdcc9]">Coding</option>
                                                    <option value="writing" className="bg-[#ebdcc9]">Creative Writing</option>
                                                    <option value="seo" className="bg-[#ebdcc9]">SEO & Marketing</option>
                                                    <option value="design" className="bg-[#ebdcc9]">UI/UX Design</option>
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
                                                <select required name="aiEngine" className={baseInputStyle}>
                                                    <option value="chatgpt" className="bg-[#ebdcc9]">ChatGPT</option>
                                                    <option value="claude" className="bg-[#ebdcc9]">Claude 3.5 Sonnet</option>
                                                    <option value="gemini" className="bg-[#ebdcc9]">Gemini Pro</option>
                                                    <option value="midjourney" className="bg-[#ebdcc9]">Midjourney v6</option>
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
                                                <select required name="difficulty" className={baseInputStyle}>
                                                    <option value="beginner" className="bg-[#ebdcc9]">Beginner</option>
                                                    <option value="intermediate" className="bg-[#ebdcc9]">Intermediate</option>
                                                    <option value="advanced" className="bg-[#ebdcc9]">Advanced</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2c221e]/60">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>

                                        {/* Custom Pixel-Perfect Radio Toggle Grid matching image spec */}
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/80 mb-3 block">
                                                Visibility Status *
                                            </label>
                                            <div className="flex flex-wrap items-center gap-6 pt-1">
                                                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer select-none">
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

                                                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer select-none">
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
                                            name="tags"
                                            type="text"
                                            placeholder="e.g. tailwind, card, component, responsive"
                                            className="w-full bg-[#ebdcc9]/20 border border-[#dfcbaf] hover:border-[#2c221e]/40 focus:border-[#2c221e] focus:outline-none rounded-xl text-sm font-medium text-[#2c221e] transition-all duration-200 px-4 py-3"
                                        />
                                    </div>

                                    {/* Actions Submission Panel */}
                                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#dfcbaf]/50 mt-2">
                                        <Button
                                            type="submit"
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

export default MyPromptsEditsButton