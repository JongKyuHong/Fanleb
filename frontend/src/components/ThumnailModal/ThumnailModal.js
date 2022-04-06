import { Divider, Modal,Button } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeThumnail, toggleModal } from '../../redux/modalSlice';
import './ThumnailModal.css';
import empty from "../post/empty-image.jpg";
import { useNavigate } from 'react-router-dom';
import Subscribe from '../../projectsPages/Subscribe';
function ThumnailModal() {
  const { isOpen, collectionName, thumnailImgUrl, userImgUrl, nickname, description, category, userAddress, contentsData} = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const addr = useSelector(state => state.user.userInfo.userAddress)
  const navigator = useNavigate();
  const closeModal = () => {
    dispatch(removeThumnail())
    dispatch(toggleModal())
    }
  const [open, setOpen] = useState(false)
  const buttonClick = () => {
    setOpen(true)
  }
  return (
    <>
    <Modal
      open={isOpen}
      onBackdropClick={closeModal}
      // disableScrollLock={true}
      sx={{
        overflow: 'scroll',
        height: '100%',
      }}
    >
      <div className='item section__padding' style={{width: '90%', background: '#24252d', borderRadius: '30px', }}>
        <div className="item-image">
          <img src={thumnailImgUrl ? thumnailImgUrl : empty} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{collectionName}</h1>
              <p>From <span>4.5 SSF</span> ‧ 20 of 25 available</p>
            </div>
            <div className="item-content-creator">
            <div style={{overflow: 'hidden'}}><p>{ category }</p></div>
              <div>
                <img src={userImgUrl} alt="creator" />
                <p>{nickname} </p>             
              </div>              
            </div>
            <div className="item-content-detail">
            <p>{description}</p>
            <Divider sx={{margin: '20px 0'}} />
              <p style={{overflow: 'hidden', width: 'auto'}}>Address: {userAddress}</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn" onClick={buttonClick}>구독하기 4.5 ETH</button>
            <button className="secondary-btn"
              onClick={() => {
                if (addr) {
                  closeModal()
                  navigator(`/content/${userAddress}`)
                } else {
                  alert('지갑 연결이 필요합니다.')
                  window.open('https://metamask.io/download/', '_blank')
                }
              }}
              >입장하기</button>
            </div>
          
            </div>
        </div>
      </Modal>
        <Subscribe open={open} setOpen={setOpen} urlId={userAddress}/>
    </>
  )
}

export default ThumnailModal;
