import axios from "axios";
import { updateStart, updateSuccess, updateFailure } from "./userSlice";

// 고양이 사진을 랜덤으로 가져오는 API
export const updateUser = async (dispatch) => {
  dispatch(updateStart());
  try {
    const res = await axios.get("https://api.thecatapi.com/v1/images/search");
    console.log(res.data[0])
    dispatch(updateSuccess(res.data[0].url));
  } catch (err) {
    dispatch(updateFailure());
  }
};