import axios from "axios";
import { updateThumnail } from "./modalSlice";
import { updateStart, updateSuccess, updateFailure, fetchUserInfo, updateLoadSuccess } from "./userSlice";

// 유저 회원가입 여부 확인
export const checkUser = async (addr) => {

  // console.log('회원 체크 시작', addr)
  try {
    const res = await axios(`api/users/valid/first?user_address=${addr}`);
    return true
    // return data.result;

  } catch (err) {
    return false
  }
}

// 회원 등록 
export const registerUser = async (addr) => {
  try {
    const { data } = await axios.post(
      `api/users/register`, { 'user_address': addr }
    )
    console.log(data, '회원 등록되었습니다.')
  } catch (err) {
    console.log(err, '회원 등록에 실패했습니다.')
  }
  
}

// 유저 정보를 서버에 저장하는 함수
// (기존에 동일한 유저 이름이 존재하면 500에러... )
// 이외에도 아직 회원 미등록, address가 이미 존재하는 경우 등 서버에서 받지 못하는 경우를 다양하게 생각해보자)
export const updateUser = async (dispatch, userFormData) => {
  // console.log('업데이트')
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
    // console.log('회원 정보 수정', data)
    dispatch(updateSuccess(data.data));
  } catch (err) {
    console.log(err)
    dispatch(updateFailure());
  }
};

// 내 정보 가져오는 함수
export const getUser = async (dispatch, userAdr) => {    
  try {
    const { data } = await axios(
      `api/users/address?user_address=${userAdr}`
    )    
    // console.log(data.data)
    dispatch(fetchUserInfo(data.data));
  } catch (err) {
    console.log(err)
  }

}

// // 내 콜렉션 가져오는 함수: 미완
// export const getMyCollections = async (addr) => {
//   try {
//     let collections = [];
//     while (true) {
//       const { data } = await axios(`api/collections?page=1&user_address=${addr}`);
//       collections = [...collections, data.data.content]
      
//       if (data.data.last) break
//     }
//     return collections
//   } catch (err) {
//     console.log(err)
//   }
// };