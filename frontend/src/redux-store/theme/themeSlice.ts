import { createSlice } from "@reduxjs/toolkit";

export interface ThemeType {
    theme: "light" | "dark";
}

const initialState: ThemeType = {
    theme: "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state: ThemeType) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
