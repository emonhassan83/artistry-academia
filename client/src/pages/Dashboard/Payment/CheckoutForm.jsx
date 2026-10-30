import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { savePaymentClassData } from "../../../api/classes/student.api";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ closeModal, classData, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(classData);

  useEffect(() => {
    //* generate client secret and save in state
    if (classData?.classInfo?.courseFree) {
      axiosSecure
        .post("/create-payment-intent", {
          price: classData?.classInfo?.courseFree,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [classData, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    setProcessing(true);

    //* confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      console.log("[paymentIntent]", paymentIntent);
      setProcessing(false);

      if (paymentIntent.status === "succeeded") {
        try {
          const paymentInfo = {
            ...classData,
            transactionId: paymentIntent.id,
            isPayed: true,
            payment_date: new Date().toISOString(),
          };

          //* save payment info in DB
          const res = await savePaymentClassData(paymentInfo);
          console.log(res);

          res?.data?.insertedId && toast.success("Payment class successfully!");

          navigate("/dashboard/enrolled-class");
          refetch();
          closeModal();
        } catch (error) {
          toast.error(error.message);
          closeModal();
        }
      }
    }
  };

  return (
    <>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-6 justify-around">
          <button onClick={closeModal} className="btn btn-sm w-40 rounded-3xl">
            {" "}
            cancel
          </button>
          <button
            className="btn btn-sm w-40 rounded-3xl"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay {classData?.classInfo?.courseFree}$
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-red-600 text-center mt-4 lg:mt-6">{cardError}</p>
      )}
    </>
  );
};

export default CheckoutForm;
