import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Crown } from "lucide-react";
import Link from 'next/link';
import { subscription } from '@/lib/subscription';

export const dynamic = 'force-dynamic';

export default async function PremiumSuccess({ searchParams }) {
    const { session_id } = await searchParams
    console.log(session_id, 'sessionid')

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })
    
    const metadata = session?.metadata;

    if (metadata) {
        await subscription({ ...metadata, sessionId: session_id })
    }

    const amountPaid = session?.amount_total ? (session.amount_total / 100).toFixed(2) : "5.00";
    const currency = session?.currency ? session.currency.toUpperCase() : "USD";

    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md relative overflow-hidden rounded-[2rem] p-0.5 bg-gradient-to-r from-[#dfcbaf] via-[#4a3b35] to-[#2c221e] shadow-[0_25px_60px_-15px_rgba(44,34,30,0.3)] group animate-in fade-in zoom-in-95 duration-500">

                <div className="absolute -inset-24 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="bg-gradient-to-br from-[#ebdcc9] via-[#f5ebd3] to-[#dfcbaf] text-[#2c221e] rounded-[30px] p-8 text-center relative overflow-hidden">

                    <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#4a3b35]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#2c221e]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-[#2c221e]/10 blur-xl animate-ping duration-1000" />
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2c221e] to-[#4a3b35] flex items-center justify-center shadow-[0_12px_30px_rgba(44,34,30,0.25)] border-4 border-[#ebdcc9] relative z-10 transition-transform duration-500 group-hover:scale-105">
                                <CheckCircle2 className="w-11 h-11 text-[#ebdcc9] fill-[#ebdcc9]/10" />
                            </div>
                        </div>
                        <Sparkles className="w-6 h-6 text-amber-500 absolute top-[-5px] right-8 animate-pulse fill-current" />
                    </div>

                    <div className="space-y-2 mb-8">
                        <h1 className="text-3xl sm:text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                            Payment Successful
                        </h1>
                        <h2 className="text-xl font-extrabold tracking-tight text-[#2c221e]/90">
                            <span className='text-sm text-amber-800 font-bold'>
                                {session?.customer_details?.email || session?.customer_email}
                            </span> <br />
                            Welcome to the Club!
                        </h2>
                        <p className="text-xs text-[#2c221e]/70 max-w-xs mx-auto leading-relaxed font-medium">
                            Your account has been upgraded instantly. You now have lifetime unlimited access to all premium features.
                        </p>
                    </div>

                    <div className="bg-[#2c221e]/5 border border-[#2c221e]/10 rounded-2xl p-5 mb-8 text-left space-y-3.5 backdrop-blur-sm">
                        <div className="flex items-center justify-between text-xs border-b border-[#2c221e]/10 pb-3">
                            <span className="text-[#2c221e]/60 font-bold uppercase tracking-wider text-[10px]">Activated Plan</span>
                            <span className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-black tracking-wider text-[10px] uppercase px-2.5 py-1 rounded-md shadow-sm">
                                <Crown className="w-3 h-3 fill-current" /> Pro Lifetime
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs border-b border-[#2c221e]/10 pb-3">
                            <span className="text-[#2c221e]/60 font-bold uppercase tracking-wider text-[10px]">Amount Paid</span>
                            <span className="text-emerald-700 font-black text-sm">${amountPaid} {currency}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-0.5">
                            <span className="text-[#2c221e]/60 font-bold uppercase tracking-wider text-[10px]">Access Status</span>
                            <span className="flex items-center gap-1 text-[#2c221e] font-bold">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> All Tools Unlocked
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="/dashboard/user/profile"
                            className="w-full flex items-center justify-center gap-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_4px_20px_rgba(44,34,30,0.2)] hover:shadow-[0_4px_25px_rgba(44,34,30,0.35)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer border border-[#dfcbaf]/20 group/btn"
                        >
                            <span>Go to Profile</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>

                        <p className="text-[10px] text-[#2c221e]/50 font-semibold tracking-wide">
                            A receipt has been sent to your registered email.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}