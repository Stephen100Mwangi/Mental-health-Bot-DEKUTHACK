import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  value: {
    username: '',
    email: '',
    loggedIn: false,
    _id: '',
  },
};

export const UserSlice = createSlice ({
  name: 'bot_User',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.loggedIn = true;
      state.value._id = action.payload._id;
    },
    logoutUser: state => {
      state.value.username = '';
      state.value.email = '';
      state.value.loggedIn = false;
      state.value._id = '';
    },
  },
});

export const {loginUser, logoutUser} = UserSlice.actions;
export default UserSlice.reducer;
