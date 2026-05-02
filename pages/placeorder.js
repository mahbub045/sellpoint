import Breadcrumb from "@/components/Breadcrumb";
import CheckoutWizard from "@/components/CheckoutWizard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";

const PlaceOrderScreen = ({ categoryDetails, searchData }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems = [], shippingAddress = {}, paymentMethod = "" } = cart;

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const itemsPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.discountPrice,
      0,
    );
  }, [cartItems]);

  const itemsCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    if (orderPlaced) {
      return;
    }
    if (!shippingAddress?.address) {
      router.push("/shipping");
      return;
    }
    if (!paymentMethod) {
      router.push("/payment");
      return;
    }
    if (cartItems.length === 0 && !orderPlaced) {
      router.push("/");
    }
  }, [cartItems.length, orderPlaced, paymentMethod, router, shippingAddress]);

  const buildReceiptText = (summary) => {
    const lines = [];
    lines.push("SellPoint Receipt");
    lines.push(`Order ID: ${summary.orderId}`);
    lines.push(`Placed At: ${summary.placedAt}`);
    lines.push("");
    lines.push("Shipping Details:");
    lines.push(`Name: ${summary.shippingAddress.fullName || ""}`);
    lines.push(`Phone: ${summary.shippingAddress.phone || ""}`);
    lines.push(`Address: ${summary.shippingAddress.address || ""}`);
    lines.push(`District: ${summary.shippingAddress.district || ""}`);
    lines.push(`Division: ${summary.shippingAddress.division || ""}`);
    lines.push("");
    lines.push(`Payment Method: ${summary.paymentMethod}`);
    lines.push("");
    lines.push("Items:");
    summary.cartItems.forEach((item) => {
      lines.push(
        `- ${item.name} x${item.quantity} @ ${item.discountPrice} = ${
          item.quantity * item.discountPrice
        }`,
      );
    });
    lines.push("");
    lines.push(`Total Items: ${summary.itemsCount}`);
    lines.push(`Total Price: BDT ${summary.itemsPrice}`);
    return lines.join("\n");
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const orderId = `SP-${Date.now().toString(36).toUpperCase()}`;
    const placedAt = new Date().toISOString();
    const summary = {
      orderId,
      placedAt,
      cartItems,
      shippingAddress,
      paymentMethod,
      itemsCount,
      itemsPrice,
    };

    summary.receiptText = buildReceiptText(summary);

    setOrderSummary(summary);
    setOrderPlaced(true);

    dispatch({ type: "CART_RESET" });
    Cookies.remove("cart");
  };

  const handleDownloadReceipt = () => {
    if (!orderSummary?.receiptText) return;

    const doc = new jsPDF();
    const lines = orderSummary.receiptText.split("\n");
    const lineHeight = 8;
    let cursorY = 10;

    lines.forEach((line) => {
      if (cursorY > 280) {
        doc.addPage();
        cursorY = 10;
      }
      doc.text(line, 10, cursorY);
      cursorY += lineHeight;
    });

    doc.save(`receipt-${orderSummary.orderId}.pdf`);
  };

  const customBreadcrumbs = [
    { href: "/", label: "Home" },
    { label: "Cart" },
    { href: "/shipping", label: "Shipping Address" },
    { href: "/payment", label: "Payment Method" },
    { label: "Place Order" },
  ];

  return (
    <>
      <Header
        title="Place Order"
        categoryDetails={categoryDetails}
        searchData={searchData}
      />
      <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
      <div className="mx-auto px-4 py-2">
        <CheckoutWizard activeStep={3} />
        <div className="max-w-screen-md mx-auto bg-slate-100 dark:bg-slate-950 px-4 py-4 shadow-md shadow-emerald-600 rounded-md">
          <h2 className="text-xl text-emerald-600 font-medium text-center">
            Place Order
          </h2>

          {orderPlaced ? (
            <div className="mt-4 text-center">
              <p className="text-emerald-600 font-medium">
                Your order has been placed successfully.
              </p>
              <p className="text-sm mt-2">Order ID: {orderSummary?.orderId}</p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  className="primary-button font-semibold dark:text-black"
                  onClick={handleDownloadReceipt}
                >
                  Download Receipt (PDF)
                </button>
                <button
                  type="button"
                  className="primary-button !bg-emerald-200 hover:!bg-emerald-300 font-semibold dark:text-black"
                  onClick={() => router.push("/")}
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 space-y-4">
                <div className="border border-emerald-200 rounded-md p-3">
                  <h3 className="text-emerald-600 font-medium">
                    Shipping Address
                  </h3>
                  <p className="text-sm">{shippingAddress.fullName}</p>
                  <p className="text-sm">{shippingAddress.phone}</p>
                  <p className="text-sm">{shippingAddress.address}</p>
                  <p className="text-sm">
                    {shippingAddress.district}, {shippingAddress.division}
                  </p>
                </div>

                <div className="border border-emerald-200 rounded-md p-3">
                  <h3 className="text-emerald-600 font-medium">
                    Payment Method
                  </h3>
                  <p className="text-sm">{paymentMethod}</p>
                </div>

                <div className="border border-emerald-200 rounded-md p-3">
                  <h3 className="text-emerald-600 font-medium">Order Items</h3>
                  <ul className="divide-y divide-emerald-100">
                    {cartItems.map((item) => (
                      <li
                        key={item.slug}
                        className="py-2 flex items-center justify-between text-sm"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>BDT {item.discountPrice * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-sm font-medium flex justify-between">
                    <span>Total Items</span>
                    <span>{itemsCount}</span>
                  </div>
                  <div className="text-sm font-medium flex justify-between">
                    <span>Total Price</span>
                    <span>BDT {itemsPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="w-24 primary-button !bg-emerald-200 hover:!bg-emerald-300 font-semibold dark:text-black"
                  onClick={() => router.push("/payment")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-32 primary-button font-semibold dark:text-black"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrderScreen;

PlaceOrderScreen.auth = true;

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
