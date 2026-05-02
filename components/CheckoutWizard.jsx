const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <div className="md:mx-5 py-4 flex flex-nowrap font-medium overflow-x-auto">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center sm:text-base text-xs whitespace-nowrap px-2
                        ${
                          index <= activeStep
                            ? "border-emerald-500 text-emerald-500"
                            : "border-gray-400 text-gray-400"
                        }
                        `}
          >
            {step}
          </div>
        ),
      )}
    </div>
  );
};

export default CheckoutWizard;
