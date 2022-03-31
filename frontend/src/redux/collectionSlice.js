import { createSlice } from "@reduxjs/toolkit";

// 네비게이션바의 유저 프로필 사진을 바꿔주는 reducer, state 
export const collectionSlice = createSlice({
  name: "collection",
  initialState: {    
    collectionInfo: {

    },
    pending: false,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
      state.error = false;
    },
    updateCollectionSuccess: (state, action) => {
      state.pending = false;
      console.log('컬렉션 정보 업데이트', action.payload)
      // state.userInfo.imageUrl = action.payload.img_url;      
      // state.userInfo.userCategory = action.payload.users_category.user_category_name;
      // state.userInfo.userDescription = action.payload.user_description;
      // state.userInfo.userNickname = action.payload.nickname;
      state.error = false
      alert('컬렉션 정보 성공적으로 저장되었습니다.')
    },
    updateFailure: (state) => {
      state.pending = false;
      state.error = true;
      console.error
      // alert('정보를 다시 입력해주세요.')
    },    
  },
});

export const {
  updateStart,
  updateCollectionSuccess,
  updateFailure,
  openModal,
  closeModal,
  updateAddress,
  fetchUserInfo
} = collectionSlice.actions;
export default collectionSlice.reducer;