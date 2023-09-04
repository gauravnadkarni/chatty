import ThunkAPI from "../../../types/thunk-api";
import { AppState } from "../../../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import UserService from "@/services/user";
import GenericObject from "@/types/generic-object";

// Type for our state
export interface AuthState {
  user: {
    id:number | null
    name:string | null
    email:string | null
  }
}

// Initial state
const initialState: AuthState = {
    user: {
      id: null,
      name:null,
      email:null
    }
};

/*export const signInCall = createAsyncThunk(
  'auth/signIn',
  async (signInInfo:{username:string, password:string}, thunkAPI:ThunkAPI) => {
    const authService:UserService = new UserService();
    const data = await authService.signIn(signInInfo);
    return data;
  }
)

export const signInCheckCall = createAsyncThunk(
  'auth/checksignIn',
  async (data: GenericObject, thunkAPI:ThunkAPI) => {
    const authService:UserService = new UserService();
    const res = await authService.checkSignIn(data);
    return res;
  }
)*/

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
  },
  extraReducers:(builder) => {
    builder.addCase(HYDRATE, (state, action:any) => {
      return {
        ...state,
        ...action.payload.data.auth,
      };
    });
  },
});

//export const {  } = authSlice.actions;
export const selectUser = (state: AppState) => state.auth.user;

export default authSlice.reducer;
