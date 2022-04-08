import { createSlice } from "@reduxjs/toolkit";

// 썸네일 모달창을 열어주고 정보를 채워주는 reducer, state 
export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    thumnailInfo: {
      thumnailImgUrl: "",
      // contentsData: "",
      userImgUrl: "",
      nickname: "",
      description: "",
      category: "",
      userAddress: "",
      collectionName: "",
    },
    isSubsOpen: false,
    isLoading: false,
  },
  reducers: {
    openThumnailModal: (state, {payload}) => {
      state.isOpen = true;
      state.isOpen = true;
      state.thumnailImgUrl = payload.imgUrl;
      // 리덕스에서 배열은 그냥 넣으면 작동이 안된다!      
      // state.contentsData.push(payload);
      state.userImgUrl = payload.userImgUrl;
      state.nickname = payload.nickname;
      state.description = payload.description;
      state.category = payload.category;
      state.userAddress = payload.userAddress;
      state.collectionName = payload.collectionName;
    },
    closeThumnailModal: (state) => {
      state.isOpen = false
      state.thumnailImgUrl = "";
      // state.contentsData = [];
      state.userImgUrl = "";
      state.nickname = "";
      state.description = "";
      state.category = "";
      state.userAddress = "";
      state.collectionName = "";
    },
    updateThumnail (state, {payload}) {
      // console.log(state.contentsData)
      // console.log('리덕스에서', action.payload.contentsData)
      state.isOpen = true;
      state.thumnailImgUrl = payload.imgUrl;
      // 리덕스에서 배열은 그냥 넣으면 작동이 안된다!      
      // state.contentsData.push(payload);
      state.userImgUrl = payload.userImgUrl;
      state.nickname = payload.nickname;
      state.description = payload.description;
      state.category = payload.category;
      state.userAddress = payload.userAddress;
      state.collectionName = payload.collectionName;
    },
    removeThumnail: (state) => {
      state.thumnailImgUrl = "";
      // state.contentsData = [];
      state.userImgUrl = "";
      state.nickname = "";
      state.description = "";
      state.category = "";
      state.userAddress = "";
      state.collectionName = "";
    },
    openSubsModal: (state) => {
      state.isSubsOpen = true
    },
    closeSubsModal: (state) => {
      state.isSubsOpen = false
    },
    openLoadingSpinner: (state) => {
      state.isLoading = true
    },
    closeLoadingSpinner: (state) => {
      state.isLoading = false
    },
  },
});

export const {  
  updateThumnail,
  removeThumnail,
  openThumnailModal,
  closeThumnailModal,
  openSubsModal,
  closeSubsModal,
  openLoadingSpinner,
  closeLoadingSpinner,
} = modalSlice.actions;
export default modalSlice.reducer;