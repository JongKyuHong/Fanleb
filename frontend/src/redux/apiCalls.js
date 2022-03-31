import axios from "axios";
import { updateStart, updateSuccess, updateFailure, fetchUserInfo, updateLoadSuccess } from "./userSlice";

// 유저 정보를 서버에 저장하는 함수
// (기존에 동일한 유저 이름이 존재하면 500에러... )
// 이외에도 아직 회원 미등록, address가 이미 존재하는 경우 등 서버에서 받지 못하는 경우를 다양하게 생각해보자)
export const updateUser = async (dispatch, userFormData) => {
  dispatch(updateStart());
  // for (let i of userFormData) {
  //   console.log(i)
  // }
  try {
    const { data } = await axios({
      method: "PATCH",
      url: "api/users/edit",
      data: userFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(data)
    dispatch(updateSuccess(data.data));
  } catch (err) {
    console.log(err)
    dispatch(updateFailure());
  }
};

// 내 정보 가져오는 함수: 미완
export const getUser = async (dispatch, userAdr) => {
  console.log('유저어드레스', userAdr)

  try {
    const res = await axios.get({
      url: 'http://j6a107.p.ssafy.io/api/users/address',
      data: {'user_address': '0x1c6cadfccc5ca5bbd53d2b9b053fe03caedae92f'},
      headers: {'Content-Type': 'application/json'}
    })
    console.log('결과', res)
    
  } catch (err) {
    console.log(err)
  }

}

// 내 콜렉션 가져오는 함수: 미완
export const getMyCollections = async (dispatch, category) => {
  dispatch(updateStart()); 
  try {
    const { data } = await axios({
      method: "GET",
      url: `api/collections/list?search[sortBy]=${category}&search[query]=`,      
      headers: { },
    });
    console.log(data)
    dispatch(updateLoadSuccess());
  } catch (err) {
    console.log(err)
    dispatch(updateFailure());
  }
};