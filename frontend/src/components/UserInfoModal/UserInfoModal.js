import { LoadingButton } from '@mui/lab'
import { Avatar, Button, Card, Divider, Modal, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/apiCalls';
import { closeModal } from '../../redux/userSlice';
import './UserInfoModal.css';
// import profile from '../../images/profile.jpg';
  
// 모달도 임시로 만들어놓음, 개인정보수정에 모달을 쓸지, 페이지를 쓸지 의견 있으시면 말씀 부탁드립니다.
export const UserInfoModal = ({userInfo, address}) => {  
  const dispatch = useDispatch();
  // const isOpen = useSelector(state => state.user.userInfo.isOpen);
  // const { userInfo } = useSelector(state => state.user)
  const [profilePic, setProfilePic] = useState(null);
  const [nickname, setNickname] = useState("");  
  const [isOverlap, setIsOverlap] = useState({check: false, status: false});  
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("일반인");
  // const [address, setAddress] = useState("");
  const { pending, error, modalIsOpen } = useSelector(state => state.user);
  // 프로필 아바타 변경 함수
  const editAvatar = (e) => {    
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = async () => {
      setProfilePic({
        file : file,
        previewURL : reader.result
      })
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }
  // 유저 정보 데이터 서버로 보내는 함수
  const onSubmit = (e) => {
    e.preventDefault();    
    if (nickname.trim().length === 0 || nickname.trim().length === null) {
      alert('닉네임을 입력해주세요')
      return
    }
    if (isOverlap.check === false) {
      alert('닉네임 중복 체크를 해주세요')
      return
    }
    if (description.trim().length === 0 || description.trim().length === null) {
      alert('자기소개를 입력해주세요')
      return
    }
    if (profilePic === null) {
      alert('프로필 이미지를 설정해주세요')
      return
    }        
    if (profilePic.file === "") {
      alert('이미지를 다시 한번 등록해주세요.')
      return
    }

    if (category === null) {
      alert('카테고리를 선택해주세요')
      return
    }
    if (address.length == 0) {
      alert('지갑 연동을 다시 해주세요.')
      return
    }
    let data = new FormData();
    data.append('nickname', nickname);
    data.append('user_description', description);
    data.append('user_category', category);
    data.append('img', profilePic.file);
    data.append('user_address', address);
    updateUser(dispatch, data)
    console.log('주소', address, data)
    // dispatch(toggleModal())    
  }
  const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
    }))
  // 닉네임 중복 체크
  const checkNickname = async () => {
    if (nickname.trim() === "") {
      alert('닉네임을 입력해주세요.')
      return
    }
    try {
      const res = await axios(`api/users/valid/nickname?nickname=${nickname}`)
      setIsOverlap({ check: true, status: false})
    } catch (err) {
      if (nickname === userInfo.userNickname) {
        setIsOverlap({ check: true, status: false})  
      } else {
        setIsOverlap({ check: true, status: true})
      }
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    if (userInfo?.userNickname && userInfo?.userDescription && userInfo?.userCategory && userInfo?.imageUrl) {
      setNickname(userInfo?.userNickname)
      setDescription(userInfo?.userDescription)
      setCategory(userInfo?.userCategory !== null ? userInfo?.userCategory : '일반인')
      setProfilePic({ file: "", previewURL: userInfo?.imageUrl })
    } else {
      setNickname("")
      setDescription("")
      setCategory("일반인")
      setProfilePic({})
    }
    // setAddress(userInfo?.userAddress)
    // toDataURL(userInfo?.imageUrl)
    //   .then(dataUrl => {
    //     setProfilePic({ file: dataUrl, previewURL: userInfo?.imageUrl })       
    //   })    
  }, [userInfo])
  
  return (      
    <Modal open={modalIsOpen} disableScrollLock={true} sx={{ overflow: 'scroll'}}>
      <div className='login section__padding'>
        <div className="login-container">        
          <h1>내 정보 수정</h1> 
          <div style={{ display: 'flex', justifyContent: 'center', }}>
            <label htmlFor='image'>
              <Avatar src={profilePic?.previewURL} sx={{ width: 150, height: 150, cursor: 'pointer' }} />
              <input type='file' style={{display: 'none'}} id="image" onChange={editAvatar} />
            </label>
          </div>          
          <form className='login-writeForm' autoComplete='off' style={{marginTop: '3vh'}} onSubmit={onSubmit}>
            <div className="login-formGroup" style={{display: 'flex'}}>
              <label>닉네임</label>
              <div style={{display: 'flex'}}>
                <input value={nickname} onChange={e => setNickname(e.target.value)} type="text" placeholder='닉네임' style={{flexGrow: 1, marginRight: '10px', width: '100%'}}/>
                <a onClick={checkNickname} className='login-writeButton' style={{ textAlign: 'center', cursor: 'pointer', alignSelf: 'center'}}>검사</a> 
              </div>
              {isOverlap.check && isOverlap.status === false && <span style={{color: 'greenyellow'}}>사용할 수 있는 닉네임입니다.</span>}
              {isOverlap.check && isOverlap.status === true && <span style={{color: 'red'}}>이미 사용하고 있는 닉네임입니다.</span>}
            </div>
            <div className="login-formGroup">
              <label>자기소개</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder='자신을 소개하세요' style={{background: '#1B1A21'}}/>
            </div>
            <div className="formGroup">
              <label>카테고리</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ background: '#1B1A21' }}>
                <option value="가수">가수</option>
                <option value="배우">배우</option>
                <option value="셀럽">셀럽</option>
                <option value="일반인">일반인</option>                
              </select>
            </div>
            <div className="login-formGroup">
              <label>지갑 주소</label>
              <input type="text" value={address} readOnly />
            </div>
          <div>
              {!pending ?
              <button className='login-writeButton' type='submit'>저장</button>
                :
                <LoadingButton
                  // onClick={handleClick}
                  loading={true}
                  variant="outlined"
                  disabled
                  className='login-writeButton'
                >
                  disabled
                </LoadingButton>
              }
              {error && <span style={{ marginLeft: '2vw', color: 'red' }}>Error!</span>}
              {userInfo && userInfo.userNickname?.length > 0 && <button className='login-reg-writeButton' onClick={() => dispatch(closeModal())}>취소</button>}
          </div>
          </form>
        </div>
      </div>
    </Modal>
    ) 
};