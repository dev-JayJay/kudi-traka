import React from "react";
import "./paymentPlan.css";
import { useDispatch } from "react-redux";
import { planAmount } from "../../redux/payment-planSlices";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const PaymentPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="paymentwrapper">
      <div className="plancontainer">
        <div className="plan">
          {/* <h4>Silver</h4> */}
          <p className="price">₦1000 - 50 credits </p>
          {/* <p className="text">
            <span>10 credits</span>, which is <span>10%</span> of full MISA
            credits.
          </p> */}
        </div>
        <button
          onClick={() => {
            dispatch(planAmount(10));
            enqueueSnackbar({
                variant: 'success',
                message: 'Silver plan selected successfully'
            });
            navigate(`/buy-credit`);
          }}
        >
          Purchase 50 credits
        </button>
      </div>
      <div className="plancontainer">
        <div className="plan">
          {/* <h4>Gold</h4> */}
          <p className="price">₦3000 - 150 credits</p>
          {/* <p className="text">
            <span>30 credits</span>, which is <span>30%</span> of full MISA
            credits.
          </p> */}
        </div>
        <button
          onClick={() => {
            dispatch(planAmount(30));
            enqueueSnackbar({
                variant: 'success',
                message: 'Gold plan selected successfully'
            });
            navigate(`/buy-credit`);
          }}
        >
          Purchase 150 credits
        </button>
      </div>
      <div className="plancontainer">
        <div className="plan">
          {/* <h4>Platinum</h4> */}
          <p className="price">₦5000 - 250 credits</p>
          {/* <p className="text">
            <span>50 credits</span>, which is <span>50%</span> of full MISA
            credits.
          </p> */}
        </div>
        <button
          onClick={() => {
            dispatch(planAmount(50));
            enqueueSnackbar({
                variant: 'success',
                message: 'Platinum plan selected successfully'
            });
            navigate(`/buy-credit`);
          }}
        >
          Purchase 250 credits
        </button>
      </div>
      <div className="plancontainer">
        <div className="plan">
          {/* <h4>Diamond</h4> */}
          <p className="price">₦10,000 - 500 credits</p>
          {/* <p className="text">
            <span>100 credits</span>, which is <span>100%</span> of full MISA
            credits.
          </p> */}
        </div>
        <button
          onClick={() => {
            dispatch(planAmount(100));
            enqueueSnackbar({
                variant: 'success',
                message: 'Diamond plan selected successfully'
            });
            navigate(`/buy-credit`);
          }}
        >
          Purchase 500 credits
        </button>
      </div>
    </div>
  );
};
