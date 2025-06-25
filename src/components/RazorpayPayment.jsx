import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const RazorpayPayment = ({
  amount,
  metadata = {},
  onSuccess = () => {},
  onFailure = () => {},
  prefill = { name: "", email: "", contact: "" },
  showModalAfterSuccess = true,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [isPaymentTriggered, setIsPaymentTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Your Company",
      description: "Transaction",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        setIsLoading(false);
        showModalAfterSuccess && setModalShow(true);
        onSuccess({ ...response, metadata });
      },
      prefill,
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          onFailure("Payment dismissed by user");
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
    });

    paymentObject.open();
  };

  useEffect(() => {
    if (!isPaymentTriggered && amount > 0) {
      setIsPaymentTriggered(true);
      handlePayment();
    }
  }, [isPaymentTriggered, amount]);

  const PaymentSuccessModal = () => (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
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
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Body>
    </Modal>
  );

  return <>{showModalAfterSuccess && <PaymentSuccessModal />}</>;
};

export default RazorpayPayment;
