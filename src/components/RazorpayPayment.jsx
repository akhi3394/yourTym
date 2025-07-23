import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const RazorpayPayment = ({
  amount, // Pass in INR (Example: 500 for ₹500)
  metadata = {}, // Should include { orderId: "..." } if backend generates it
  onSuccess = () => { },
  onFailure = () => { },
  prefill = { name: "", email: "", contact: "" },
  showModalAfterSuccess = true,
  onClose = () => { },
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
 
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load.");
      setIsLoading(false);
      onFailure("Script load failure");
      return;
    }

    if (!razorpayKey) {
      alert("Razorpay Key is missing. Check your .env file.");
      setIsLoading(false);
      onFailure("Missing Razorpay Key");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100, // Convert ₹ to paise
      currency: "INR",
      name: "YourTym",
      description: "Transaction Payment",
      image: "https://your-logo-url.com/logo.png",
      // order_id: metadata.orderId, // Optional if backend provides
      handler: function (response) {
        setIsLoading(false);
        setModalShow(true);
        onSuccess({...response,metadata});
      },
      prefill,
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
          onFailure("Payment dismissed by user");
          onClose();
        },
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", (response) => {
      setIsLoading(false);
      onFailure(response.error);
      onClose();
    });

    paymentObject.open();
  };

  const PaymentSuccessModal = () => (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        onClose();
      }}
      size="lg"
      centered
    >
      <Modal.Body className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Success"
          style={{ width: 100, marginBottom: 20 }}
        />
        <h2>₹ {amount}</h2>
        <h4>Payment Successful</h4>
        <Button
          onClick={() => {
            setModalShow(false);
            onClose();
          }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="btn btn-primary w-full text-[#fff] bg-[#FF5534] px-5 py-3 rounded-[8px]"
      >
        {isLoading ? "Processing..." : "Proceed to payment" }
      </Button>
      {showModalAfterSuccess && <PaymentSuccessModal />}
    </>
  );
};

export default RazorpayPayment;
