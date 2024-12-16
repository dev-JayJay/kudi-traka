import React, { useState } from "react";
import "./buy-credit.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import paymentImage from "../../../images/payment-done.png";
import { useNavigate } from "react-router-dom";

export const BuyCredit = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("bank");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="payment_buttons">
        <Modal
          open={open}
          onClose={onCloseModal}
          center
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
        >
          {/* <h2>Simple centered modal</h2> */}
          <div className="modalWrappper">
            <img
              src={paymentImage}
              alt={paymentImage}
              className="imageInModal"
            />
            <button
              onClick={() => {
                onCloseModal();
                navigate(`/chat-with-misa`);
                window.location.reload();
              }}
            >
              continue to chat
            </button>
          </div>
        </Modal>
        <button
          onClick={() => {
            setPaymentType("bank");
          }}
          style={{cursor:`pointer`}}
        >
          Pay with bank card
        </button>
        <button
          onClick={() => {
            setPaymentType("transfer");
          }}
          style={{cursor:`pointer`}}
        >
          Pay with bank transfer
        </button>
      </div>
      <div>
        {paymentType === "transfer" && (
          <div className="formWrapper">
            <div className="formText">
              <p>Buy with bank transfer </p>
            </div>
            <div className="inputContainer">
              <label>Bank Name</label>
              <p classNames="bankDetails">KUDITRAKA TECHNOLOGIES AI</p>
              {/* <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="eg *826#"
              /> */}
              <label>Bank Type</label>
              <p classNames="bankDetails">United Bank of Africa ( UBA )</p>
              <label>Account Number</label>
              <p classNames="bankDetails">1027005816</p>
              {/* <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="amount"
              /> */}
              <button onClick={onOpenModal}>Purchase credit</button>
            </div>
          </div>
        )}
        {paymentType === "bank" && (
          <div className="formWrapper credits">
            <div className="formText">
              <p>Buy credit with bank card </p>
            </div>
            <div className="inputContainer">
              <label>Card Number</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="0000 0000 0000 000"
              />
              <label>Card Holder</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Full name"
              />
              <div className="ccv_and_cardYear">
                <div>
                  <label>CVV</label>
                  <input
                    type={`text`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="000"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label>Expiration Date</label>
                  <input
                    type={`text`}
                    id="password"
                    name="password"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="MM / YY"
                  />
                </div>
              </div>
              <button onClick={onOpenModal}>Purchase credit</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
