import { useContext, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaDonate, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";
import { ThemeContext } from "../ThemeProvider/ThemeContext";

const DonationPaymentModal = () => {
  const { user } = useContext(AuthContext);
  const {darkMode} = useContext(ThemeContext);
  const stripe = useStripe();
  const elements = useElements();
  const [step, setStep] = useState("amount"); // 'amount' or 'payment'
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: singleDonation = {} } = useQuery({
    queryKey: ["donations", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  // Step 1: Validate and set donation amount
  const handleAmountSubmit = (e) => {
    e.preventDefault();
    const value = parseInt(amount);

    if (!value) {
      setError("Please enter an amount");
      return;
    }

    if (value < 20) {
      setError("Minimum donation is 20৳");
      return;
    }

    if (value > singleDonation.maxAmount) {
      setError(`Maximum donation is ${singleDonation.maxAmount}৳`);
      return;
    }

    setStep("payment");
    setError("");
  };

  // Step 2: Process payment with Stripe
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

      if (stripeError) {
        return setError(stripeError.message);
      } else {
        setError("");
        console.log("payment method", paymentMethod);
      }

      let amountIncents = amount * 100;
      const response = await axiosSecure.post("/create-payment-intent", {
        donatedBy: user?.displayName,
        email: user?.email,
        amount: amountIncents,
      });
      console.log("from intent", response);
      const clientSecret = response.data.clientSecret;

      const final = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (final.error) {
        setError(final.error.message);
        console.log(final.error.message);
      } else {
        setError("");
        if (final.paymentIntent.status === "succeeded") {
          toast("Donation Successful!");
          console.log("Donation Successful!");
          console.log(final);
          setStep("amount");
          const paymentData = {
            donId: singleDonation.donId,
            createdBy: singleDonation.addedBy,
            createdByEmail: singleDonation.email,
            image: singleDonation.image,
            name: singleDonation.name,
            donatedBy: user?.displayName,
            email: user?.email,
            amount: amount,
            transactionId: final.paymentIntent.id,
            createdAt: new Date().toISOString(),
            payment_method: final.paymentIntent.payment_method_types[0],
          };

          const paymentRes = await axiosSecure.post(
            "/donation-payments",
            paymentData
          );
          console.log(paymentRes);
        }
      }

      // Process payment on your backend
      //   const response = await fetch('/api/process-donation', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       amount: parseInt(amount),
      //       paymentMethodId: paymentMethod.id,
      //       petId: donation.petId,
      //     }),
      //   });

      //   const result = await response.json();
      //   if (result.error) throw new Error(result.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setError("");
    }
  };

  return (
    <div className="p-6">
      {/* Header with back button in payment step */}
      <div className="flex items-center mb-4">
        {step === "payment" && (
          <button
            onClick={() => setStep("amount")}
            className="mr-2 p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <FaArrowLeft />
          </button>
        )}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {step === "amount" ? "Donation Amount" : `Donate ${amount}৳`}
        </h3>
      </div>

      {/* Step 1: Amount Selection */}
      {step === "amount" && (
        <form onSubmit={handleAmountSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter Amount (৳)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              min="20"
              max={singleDonation.maxAmount}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder={`20 - ${singleDonation.maxAmount}৳`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {/* Step 2: Payment Details */}
      {step === "payment" && (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          {/* Amount Summary */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Donation Amount
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {amount}৳
              </span>
            </div>
          </div>

          {/* Stripe Card Element */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Card Details
            </label>
            <div className="p-3 border border-gray-300 dark:border-gray-600 dark:text-gray-50 rounded-lg bg-white dark:bg-gray-800">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: `${darkMode ? "#fff" : "#1f2937"}`,
                      "::placeholder": { color: "#9ca3af" },
                      iconColor: "#3b82f6",
                    },
                    invalid: {
                      color: "#ef4444",
                      iconColor: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep("amount")}
              className="cursor-pointer flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Change Amount
            </button>
            <button
              type="submit"
              disabled={!stripe || isLoading}
              className="cursor-pointer flex-1 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaDonate />
                  Donate Now
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonationPaymentModal;
