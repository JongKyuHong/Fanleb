import axios from "axios";
import { updateStart, updateSuccess, updateFailure } from "./userSlice";

// 유저 정보를 서버에 저장하는 API
export const updateUser = async (dispatch, userFormData) => {
  dispatch(updateStart());
  try {    
    const { data } = await axios({
      method: "PATCH",
      url: "api/users/edit",
      data: userFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(data.data)
    dispatch(updateSuccess(data.data));
  } catch (err) {
    console.log(err)
    dispatch(updateFailure());
  }
};