import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import {
  setErrorMesage,
  removeNotification,
} from "../reducers/notification_reducer";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      console.log("in slice, removeUser");
      return {};
    },
  },
});

export const setUserIfLoggedIn = () => {
  return async (dispatch) => {
    const userLoggedIn = window.localStorage.getItem("loggedBlogAppUser");
    //console.log('userLoggedIn', userLoggedIn)
    if (userLoggedIn) {
      const userObject = JSON.parse(userLoggedIn);
      //console.log('userObject', userObject)
      dispatch(setUser(userObject));
      blogService.setToken(userObject.token);
    }
  };
};

export const loggin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      dispatch(setErrorMesage(error.response.data.error));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(removeUser());
    blogService.setToken(null);
  };
};

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
