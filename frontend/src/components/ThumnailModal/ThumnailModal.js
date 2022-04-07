import { Divider, Modal,Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeThumnail, toggleModal } from '../../redux/modalSlice';
import './ThumnailModal.css';
import empty from "../post/empty-image.jpg";
import { useNavigate } from 'react-router-dom';
import Subscribe from '../../projectsPages/Subscribe';
import axios from 'axios';
import { getSubscriptionInfo, SubscribeUser } from '../../utils/Subscription';

function ThumnailModal() {
  const { isOpen, collectionName, thumnailImgUrl, userImgUrl, nickname, description, category, userAddress, contentsData } = useSelector(state => state.modal);
  
  const dispatch = useDispatch();
  const myAddr = useSelector(state => state.user.userInfo.userAddress)
  const [subscriptionCnt, setSubscriptionsCnt] = useState(0);
  const [isSubscribed, setIssubscribed] = useState(false);
  const navigator = useNavigate();
  const closeModal = () => {
    dispatch(removeThumnail())
    dispatch(toggleModal())
    }

  // 구독관련
  const [open, setOpen] = useState(false)
  const buttonClick = () => {
    setOpen(true)
  }
  const [sub,setSub] = useState(false)
  const [sign, setSign] = useState(false)
  const onSub = async() =>{
    const option ={
      method:"GET",
      url:`/api/subscribe/valid/${myAddr}/${userAddress}`,
    }
    let status ='기본값'
    try{
        const data = await axios(option)
        console.log(data)
        status = data.status
    }catch(err){
        console.log(err)
      }
    
    if (myAddr) {
      if(myAddr === userAddress || status === 200){
        closeModal()
        navigator(`/content/${userAddress}`)
      }else{
        console.log(myAddr,userAddress,status)
        alert('입장할 수 없습니다!')
      }
    }else{
      alert('지갑 연결이 필요합니다.')
      window.open('https://metamask.io/download/', '_blank')
      }
  }
  const subscribe = async () => {
    await SubscribeUser(userAddress, myAddr, setSubscriptionsCnt);

  }  
  useEffect(() => {    
    const getData = async () => {
      const {count, status} = await getSubscriptionInfo(userAddress, myAddr);
      
      setSubscriptionsCnt(count)
      setIssubscribed(status)
    };
    if (isOpen) {
      getData();
      // console.log('모달 정보', userImgUrl, description)
    }
  }, [isOpen])
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
        {/* <div className="item-content">
          <div className="item-content-title">
            <h1>{collectionName}</h1>
            <p><span>1 SSF</span> ‧ {subscriptionCnt} available</p>
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
          <p style={{ overflow: 'hidden', width: 'auto' }}> <span style={{color: 'rgb(32, 129, 226)'}}>{ nickname } </span>님의 Address : {userAddress}</p>
        </div>
        <div className="item-content-buy">
          {!isSubscribed ?
          
            <button className="primary-btn" onClick={() => subscribe()}>구독하기 ( 1 SSF )</button>
            :
            <button className="secondary-btn"
              onClick={() => {
                closeModal()
                navigator(`/content/${userAddress}`)
              }}
            >입장하기</button>
          }
          </div>
        </div>
      </div>
    </Modal> */}
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
              onClick={onSub}
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
