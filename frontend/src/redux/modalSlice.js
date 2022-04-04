import { createSlice } from "@reduxjs/toolkit";

// 썸네일 모달창을 열어주고 정보를 채워주는 reducer, state 
export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    // thumnailInfo: {
      thumnailImgUrl: "",
      contentsData: "",
      userImgUrl: "",
      nickname: "",
      description: "",
      category: "",
      userAddress: "",
      collectionName: "",
    // }
  },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    updateThumnail (state, action) {
      // console.log(state.contentsData)
      // console.log('리덕스에서', action.payload.contentsData)
      state.isOpen = true;
      state.thumnailImgUrl = action.payload.imgUrl;
      // 리덕스에서 배열은 그냥 넣으면 작동이 안된다!      
      // state.contentsData.push(action.payload);
      state.userImgUrl = action.payload.userImgUrl;
      state.nickname = action.payload.nickname;
      state.description = action.payload.description;
      state.category = action.payload.category;
      state.userAddress = action.payload.userAddress;
      state.collectionName = action.payload.collectionName;
    },
    removeThumnail: (state) => {
      state.thumnailImgUrl = "";
      state.contentsData = [];
      state.userImgUrl = "";
      state.nickname = "";
      state.description = "";
      state.category = "";
      state.userAddress = "";
      state.collectionName = "";
    }
  },
});

export const {
  toggleModal,
  updateThumnail,
  removeThumnail
} = modalSlice.actions;
export default modalSlice.reducer;