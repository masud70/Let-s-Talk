import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: hasCookie(process.env.tokenKey),
		token: getCookie(process.env.tokenKey),
		user: {},
	},
	reducers: {
		getLogin: (state, action) => {
			state.status = true;
			if (action.payload.user) {
				state.user = action.payload.user;
			}
			if (action.payload.token) {
				state.token = action.payload.token;
				setCookie(process.env.tokenKey, action.payload.token);
			}
			toast.success("Login successful.");
		},

		setUserData: (state, action) => {
			state.status = true;
			if (action.payload.user) {
				state.user = action.payload.user;
				state.roles = action.payload.user.roles;
			}
		},

		getLogout: (state) => {
			deleteCookie(process.env.tokenKey);
			state.status = false;
			state.user = {};
			toast.success("Logout successful.");
		},
	},
});

export const { getLogin, getLogout, setAuthUserData } = authSlice.actions;
export default authSlice.reducer;
