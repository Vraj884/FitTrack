import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        weight: null,
        age: null,
        email: null,
        countryCode: null,
        phoneNo: null,
        loggedIn: false
    },
    reducers: {
        login: (state, action) => {
                state.name = action.payload.name;
                state.weight = action.payload.weight;
                state.age = action.payload.age;
                state.email = action.payload.email;
                state.countryCode = action.payload.countryCode;
                state.phoneNo = action.payload.phoneNo;
                state.loggedIn = true;
        },
        logout: (state) => {
                state.name = '';
                state.weight = null;
                state.age = null;
                state.email = null;
                state.countryCode = null;
                state.phoneNo = null;
                state.loggedIn = false;
        }
    }
})
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;