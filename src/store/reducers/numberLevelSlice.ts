import { createSlice } from "@reduxjs/toolkit";
import { NumberLevel } from "../../types";

type NumberLevelSlice = {
    numberLevel: NumberLevel;
};

const initialState: NumberLevelSlice = {
    numberLevel: {
        id: "",
        stt: 0,
        customer: "",
        device: "",
        service: "",
        status: "",
        timeuse: "",
        timeexpire: "",
        email: "",
        phone: "",
    },
};

const numberLevelSlice = createSlice({
    name: "numberLevel",
    initialState,
    reducers: {
        addNumberLevel: (state, action) => {
            state.numberLevel = action.payload;
        }
    },
});

export const {addNumberLevel} = numberLevelSlice.actions;
export default numberLevelSlice.reducer;
