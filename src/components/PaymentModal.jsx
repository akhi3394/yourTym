import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Modal, Button } from "react-bootstrap";

const ReusableRazorpayPayment = ({
  amount,
  metadata = {},
  onSuccess = () => {},
  onFailure = () => {},
  prefill = { name: "", email: "", contact: "" },
  showModalAfterSuccess = true,
}) => {
  const [modalShow, setModalShow] = useState(true);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [isPaymentTriggered, setIsPaymentTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("upi-kotak");

  const suggestedPayments = [
    {
      id: "upi-kotak",
      name: "Kotak Mahindra Bank UPI",
      details: "Account No. xxxx xxxx 6746",
      logo: "🏦",
    },
    {
      id: "google-pay",
      name: "Google Pay UPI",
      details: prefill.email || "rajashekar7@gmail.com",
      logo: "📱",
    },
    {
      id: "paypal",
      name: "Paypal",
      details: prefill.email || "rajashekar7@gmail.com",
      logo: "💳",
    },
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    setIsLoading(true);

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet.");
      onFailure("Script load failure");
      setIsLoading(false);
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_HERE",
      amount: amount * 100,
      currency: "INR",
      name: "Your Company",
      description: "Transaction",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        setIsLoading(false);
        if (showModalAfterSuccess) setSuccessModalShow(true);
        onSuccess({ ...response, metadata });
      },
      prefill,
      theme: {
        color: "#FF5534",
      },
      modal: {
        ondismiss: function () {
          onFailure("Payment dismissed by user");
          setIsLoading(false);
        },
      },
      method: {
        upi: selectedPayment.includes("upi") || selectedPayment === "paypal",
        card: selectedPayment === "paypal",
        netbanking: selectedPayment === "upi-kotak",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", (response) => {
      setIsLoading(false);
      onFailure(response.error);
    });

    paymentObject.open();
  };

  useEffect(() => {
    if (!isPaymentTriggered && amount > 0 && !modalShow) {
      setIsPaymentTriggered(true);
      handlePayment();
    }
  }, [isPaymentTriggered, amount, modalShow]);

  const PaymentSuccessModal = () => (
    <Modal
      show={successModalShow}
      onHide={() => {
        setSuccessModalShow(false);
        setModalShow(false);
      }}
      size="lg"
      centered
    >
      <Modal.Body className="text-center p-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Success"
          style={{ width: 100, marginBottom: 20 }}
        />
        <h2 className="text-xl font-semibold text-gray-900">₹{amount}</h2>
        <h4 className="font-medium text-gray-900 mb-4">Payment Successful</h4>
        <Button
          onClick={() => {
            setSuccessModalShow(false);
            setModalShow(false);
          }}
          className="bg-[#FF5534] text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      {modalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
              <button
                onClick={() => setModalShow(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Amount */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount to be paid</span>
                  <span className="text-xl font-semibold text-gray-900">
                    ₹{amount}
                  </span>
                </div>
              </div>

              {/* Suggested Payments */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Suggested for you
                </h3>
                <div className="space-y-3">
                  {suggestedPayments.map((payment) => (
                    <label
                      key={payment.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === payment.id
                          ? "border-[#FF5534] bg-red-50"
                          : "border-gray-200 hover:border-[#FF5534]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={payment.id}
                        checked={selectedPayment === payment.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          selectedPayment === payment.id
                            ? "border-[#FF5534] bg-[#FF5534]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPayment === payment.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {payment.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {payment.details}
                        </p>
                      </div>
                      <div className="text-2xl ml-4">{payment.logo}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Other Options */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  All other option
                </h3>
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPayment === "upi-other"
                      ? "border-[#FF5534] bg-red-50"
                      : "border-gray-200 hover:border-[#FF5534]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi-other"
                    checked={selectedPayment === "upi-other"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedPayment === "upi-other"
                        ? "border-[#FF5534] bg-[#FF5534]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPayment === "upi-other" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">UPI</p>
                    <p className="text-xs text-gray-500">
                      100% Safe and Secure Transactions
                    </p>
                  </div>
                  <div className="text-2xl ml-4">🔒</div>
                </label>
              </div>

              {/* Pay Button */}
              <button
                onClick={() => {
                  setModalShow(false);
                  setIsPaymentTriggered(true);
                  handlePayment();
                }}
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#FF5534] text-white hover:bg-red-600"
                }`}
              >
                {isLoading ? "Processing..." : "Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showModalAfterSuccess && <PaymentSuccessModal />}
    </>
  );
};

export default ReusableRazorpayPayment;
