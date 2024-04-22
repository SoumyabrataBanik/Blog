import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUserType {
    id: string;
    userName: string;
    email: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserState {
    currentUser: CurrentUserType | null;
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    currentUser: null,
    error: null,
    loading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            (state.loading = true), (state.error = null);
        },
        signInSuccess: (state, action: PayloadAction<CurrentUserType>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateAvatar: (state, action: PayloadAction<string>) => {
            if (state.currentUser) {
                state.currentUser.avatar = action.payload;
            }
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, updateAvatar } =
    userSlice.actions;

export default userSlice.reducer;
