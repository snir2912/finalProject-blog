import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//action
export const accVerificationSendTokenAction = createAsyncThunk(
  "account/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/generate-verify-email-token`,
        {},
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices

const accountVericationSlices = createSlice({
  name: "account",
  initialState: {},
  extraReducers: builder => {
    //create
    builder.addCase(accVerificationSendTokenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      accVerificationSendTokenAction.fulfilled,
      (state, action) => {
        state.token = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      }
    );
    builder.addCase(
      accVerificationSendTokenAction.rejected,
      (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      }
    );
  },
});

export default accountVericationSlices.reducer;
