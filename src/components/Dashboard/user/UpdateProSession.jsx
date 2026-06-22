'use client';

import { authClient } from '@/lib/auth-client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateProSession() {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        // যদি ইউজার লগইন থাকে কিন্তু ব্রাউজারের ক্যাশ সেশনে এখনও 'pro' না দেখায়
        if (session?.user && session.user.plan !== 'pro') {
            
            const handleSync = async () => {
                try {
                    // ১. প্রথমে ক্যাশ কুকি বাইপাস করতে Better-Auth সেশন সিঙ্ক করবে
                    await authClient.sync();
                    
                    // ২. যেহেতু cookieCache ক্যাশ ধরে রাখে, Next.js এর ক্লায়েন্ট স্টেট ও 
                    // রাউটার ক্যাশ রিফ্রেশ করতে হবে যাতে টোকেন রিলোড হয়
                    router.refresh();
                    
                    console.log("Better-Auth session updated & page refreshed!");
                } catch (err) {
                    console.error("Session sync failed:", err);
                }
            };

            handleSync();
        }
    }, [session, router]);

    return null;
}