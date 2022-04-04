import { createSlice } from "@reduxjs/toolkit";

// 네비게이션바의 유저 프로필 사진을 바꿔주는 reducer, state 
export const userSlice = createSlice({
  name: "user",
  initialState: {
    modalIsOpen: false,
    userInfo: {
      imageUrl: "",
      userAddress: "",
      userNickname: "",
      userDescription: "",
      userCategory: "일반인"
    },
    pending: false,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      console.log('유저정보 업데이트', action.payload)
      state.userInfo.imageUrl = action.payload.img_url;      
      state.userInfo.userCategory = action.payload.users_category.user_category_name;
      state.userInfo.userDescription = action.payload.user_description;
      state.userInfo.userNickname = action.payload.nickname;
      state.modalIsOpen = false
      state.error = false
      alert('정보가 성공적으로 저장되었습니다.')
    },
    updateFailure: (state) => {
      state.pending = false;
      state.error = true;
      console.error
      // alert('정보를 다시 입력해주세요.')
    },
    updateAddress: (state, action) => {
      state.userInfo.userAddress = action.payload;
      console.log('지갑주소 업데이트', action.payload)
    },
    removeAddress: (state) => {
      console.log('지갑 주소 제거')
      state.userInfo.userAddress = ""
    },
    openModal: (state) => {
      // alert('정보 모달창')
      state.modalIsOpen = true
    },
    closeModal: (state) => {
      state.modalIsOpen = false
    },
    fetchUserInfo: (state, action) => {
      state.userInfo.imageUrl = action.payload.img_url;      
      state.userInfo.userCategory = action.payload.users_category?.user_category_name;
      state.userInfo.userDescription = action.payload.user_description;
      state.userInfo.userNickname = action.payload.nickname;
      state.userInfo.userAddress = action.payload.user_address;
    },
    updateLoadSuccess: (state) => {
      state.pending = false
      state.error = false
    },
    initialUserInfo: (state) => {
      state.userInfo.imageUrl = "";      
      state.userInfo.userCategory = ""
      state.userInfo.userDescription = "";
      state.userInfo.userNickname = "";
    }
  },
});

export const {
  updateStart,
  updateSuccess,
  updateFailure,
  openModal,
  closeModal,
  updateAddress,
  removeAddress,
  fetchUserInfo,
  updateLoadSuccess,
  initialUserInfo,
} = userSlice.actions;
export default userSlice.reducer;