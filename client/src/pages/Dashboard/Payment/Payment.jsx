/* import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; */
import { useParams } from "react-router-dom";

//const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const {id} = useParams()
  console.log(id);
    
  return (
    <div>
      <div>
        <h2 className="text-5xl text-center uppercase">Payment</h2>
      </div>
      {/* <div className="my-10 lg:my-20 mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div> */}
    </div>
  );
};

export default Payment;
