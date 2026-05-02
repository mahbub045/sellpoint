import Breadcrumb from "@/components/Breadcrumb";
import CheckoutWizard from "@/components/CheckoutWizard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const PaymentScreen = ({ categoryDetails, searchData }) => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return Error("Payment method is required!");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      }),
    );
    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress?.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(
      paymentMethod === "CashOnDelivery" ? paymentMethod : "",
    );
  }, [paymentMethod, router, shippingAddress.address]);

  const customBreadcrumbs = [
    { href: "/", label: "Home" },
    { label: "Cart" },
    { href: "/shipping", label: "Shipping Address" },
    { label: "Payment Method" },
  ];

  return (
    <>
      <Header
        title="Payment Method"
        categoryDetails={categoryDetails}
        searchData={searchData}
      />
      <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
      <div className="mx-auto px-4 py-2">
        <CheckoutWizard activeStep={2} />
        <form
          className="max-w-screen-md mx-auto bg-slate-100 dark:bg-slate-950 px-4 py-2 shadow-md shadow-emerald-600 rounded-md"
          onSubmit={submitHandler}
        >
          <h2 className="text-xl text-emerald-600 font-medium text-center">
            Payment Method
          </h2>
          <p className="mb-4 text-center">Select Payment Method</p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="flex flex-col items-center p-2">
              <button
                type="button"
                id="cod"
                className={`border rounded ${selectedPaymentMethod === "CashOnDelivery" ? "border-emerald-500 shadow-md shadow-emerald-200" : "border-slate-400"}`}
                onClick={() => setSelectedPaymentMethod("CashOnDelivery")}
              >
                <img
                  src="/cod.png"
                  alt="Cash on Delivery"
                  className="w-32 h-20"
                />
              </button>
              <label htmlFor="cod" className="mt-2 text-sm">
                Cash on Delivery
              </label>
            </div>
            <div className="flex flex-col items-center p-2">
              <button
                type="button"
                id="ssl"
                className="border border-slate-400 rounded opacity-50 cursor-not-allowed"
                disabled
              >
                <img
                  src="/sslcommerz.png"
                  alt="SSLCOMMERZ"
                  className="w-32 h-20"
                />
              </button>
              <label htmlFor="ssl" className="mt-2 text-sm text-slate-500">
                SSLCOMMERZ
              </label>
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <button
              className="w-24 primary-button !bg-emerald-200 hover:!bg-emerald-300 font-semibold dark:text-black"
              onClick={() => router.push("/shipping")}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px] inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
            <button className="w-24 primary-button font-semibold dark:text-black">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px] inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PaymentScreen;

export async function getServerSideProps() {
  try {
    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/category`,
    );
    const categoryData = await categoryRes.json();

    const searchRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product/name`,
    );
    const searchData = await searchRes.json();
    return {
      props: {
        categoryDetails: categoryData,
        searchData: searchData,
      },
    };
  } catch (error) {
    console.error("Error fetching products data:", error);
    return {
      props: {
        categoryDetails: null,
        searchData: null,
      },
    };
  }
}
