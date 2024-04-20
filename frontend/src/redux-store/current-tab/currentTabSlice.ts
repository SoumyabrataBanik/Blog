import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TabSliceType {
    tab: string;
}

const initialState: TabSliceType = {
    tab: "",
};

export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setTab: (state: TabSliceType, action: PayloadAction<string>) => {
            state.tab = action.payload;
        },
    },
});

export const { setTab } = tabSlice.actions;

export default tabSlice.reducer;
