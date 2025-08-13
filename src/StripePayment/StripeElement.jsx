import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import DonationPaymentModal from "./DonationPayMentModal";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Key);

const StripeElement = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonationPaymentModal></DonationPaymentModal>
    </Elements>
  );
};

export default StripeElement;
