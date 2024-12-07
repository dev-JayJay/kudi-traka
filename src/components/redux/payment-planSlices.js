import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    amount: 0,
}

const PaymentPlanSlices = createSlice({
    name:'paymentPlanSlices',
    initialState,
    reducers:{
        planAmount: (state, action) => {
            state.amount = action.payload;
        }
    }
});

export const { planAmount } = PaymentPlanSlices.actions
export default PaymentPlanSlices.reducer;