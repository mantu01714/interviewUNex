import { PricingPlan } from '@/services/Constants';
import { supabase } from '@/services/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      try {
        // Get the line items to find the price ID
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        
        if (lineItems.data.length > 0) {
          const priceId = lineItems.data[0].price.id;
          
          // Find the corresponding plan
          const plan = PricingPlan.find(p => p.priceId === priceId);
          
          if (plan) {
            // Get customer email from session
            const customerEmail = session.customer_details?.email || session.customer_email;
            
            if (customerEmail) {
              
              // First, get the current user data
              const { data: userData, error: fetchError } = await supabase
                .from('Users')
                .select('credits')
                .eq('email', customerEmail)
                .single();

              if (fetchError) {
                return NextResponse.json(
                  { error: 'Failed to fetch user data' },
                  { status: 500 }
                );
              }

              // Calculate new credits (add to existing credits)
              const currentCredits = userData?.credits || 0;
              const newCredits = currentCredits + plan.credits;

              // Update user credits in Supabase
              const { data, error } = await supabase
                .from('Users')
                .update({ 
                  credits: newCredits
                })
                .eq('email', customerEmail)
                .select();

              if (error) {
                return NextResponse.json(
                  { error: 'Failed to update user credits' },
                  { status: 500 }
                );
              }
            } else {
              // console.log('Session data:', JSON.stringify(session, null, 2));
            }
          } else {
            // console.error('No matching plan found for price ID:', priceId);
            // console.log('Available plans:', PricingPlan.map(p => p.priceId));
          }
        } else {
          // console.error('No line items found in session');
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to process checkout session' },
          { status: 500 }
        );
      }
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;

    // Handle subscription-related events if needed
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      // console.log('Invoice payment succeeded:', invoice.id);
      
      // If you want to handle subscription renewals, add logic here
      try {
        if (invoice.subscription) {
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
          const priceId = subscription.items.data[0].price.id;
          
          // Find the corresponding plan
          const plan = PricingPlan.find(p => p.priceId === priceId);
          
          if (plan && invoice.customer_email) {
            // console.log(`Processing subscription renewal for ${invoice.customer_email}`);
            
            // Get current user data
            const { data: userData, error: fetchError } = await supabase
              .from('User')
              .select('credits')
              .eq('email', invoice.customer_email)
              .single();

            if (!fetchError && userData) {
              const currentCredits = userData.credits || 0;
              const newCredits = currentCredits + plan.credits;

              // Update credits for subscription renewal
              const { data, error } = await supabase
                .from('User')
                .update({ credits: newCredits })
                .eq('email', invoice.customer_email)
                .select();

              if (!error) {
                // console.log(`Subscription renewal: Added ${plan.credits} credits to ${invoice.customer_email}`);
              }
            }
          }
        }
      } catch (error) {
        // console.error('Error processing subscription renewal:', error);
      }
      break;

    default:
      console.log(`Unhandled event type`);
  }

  return NextResponse.json({ received: true });
}

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false,
  },
};