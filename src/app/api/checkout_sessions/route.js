import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { getUser } from '@/lib/session'
import { stripe } from '@/lib/stripe'

export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const user=await getUser()

        const PRICE_ID='price_1TjutHHT75yvwioqVd8q0kEX'
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email:user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata:{
                priceId:PRICE_ID,
                userId:user?.id,
                userName:user?.name,
                userEmail:user?.email,
            },
            mode: 'subscription',
            success_url: `${origin}/dashboard/user/premium-success?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
        });
        // console.log(session,'sss')
        // return NextResponse.json({url:session.url})
        return NextResponse.redirect(session.url, 303)

    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}