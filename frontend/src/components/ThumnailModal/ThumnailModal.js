import { Divider, Modal,Button, CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeLoadingSpinner, closeThumnailModal, openLoadingSpinner, removeThumnail, toggleModal } from '../../redux/modalSlice';
import './ThumnailModal.css';
import empty from "../post/empty-image.jpg";
import { useNavigate } from 'react-router-dom';
import Subscribe from '../../projectsPages/Subscribe';
import axios from 'axios';
import { getSubscriptionInfo, SubscribeMember, SubscribeUser } from '../../utils/Subscription';

function ThumnailModal() {
  const { isOpen, collectionName, thumnailImgUrl, userImgUrl, nickname, description, category, userAddress, contentsData } = useSelector(state => state.modal);
  
  const dispatch = useDispatch();
  const myAddr = useSelector(state => state.user.userInfo.userAddress)
  const [subscriptionCnt, setSubscriptionsCnt] = useState(0);
  const [isSubscribed, setIssubscribed] = useState(false);
  const [video, setVideo] = useState(false);
  const navigator = useNavigate();
  const closeModal = () => {
    dispatch(closeThumnailModal())
  }
  const detectMedia = (inputUrl) => {
    if (inputUrl === null || inputUrl === NaN || inputUrl === undefined) {
      return
    }
    const images = ["jpg", "gif", "png"]
    const videos = ["mp4", "3gp", "ogg"]
    // const url = new URL(inputUrl)
    // let extension = inputUrl?.split(".")
    // extension = extension[extension?.length - 1]
    
    let extension = inputUrl.split(".")
    // console.log(extension)
    extension = extension[extension.length - 1]
    if (images.includes(extension)) {
      setVideo(false)      
      
    } else if (videos.includes(extension)) {      
      setVideo(true)      
    }
    // if (images.includes(inputUrl)) {
    //   setVideo(false)      
      
    // } else if (videos.includes(inputUrl)) {      
    //   setVideo(true)      
    // }

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
    if (!userAddress.startsWith('0x')) {
      alert('구독할 수 없는 계정입니다.')
      return
    }
    if (isSubscribed) {
      alert('이미 구독한 계정입니다.')
      return
    }
    await SubscribeUser(userAddress, myAddr, setSubscriptionsCnt);
    await onBack()
    // await SubscribeMember(userAddress, myAddr, setSubscriptionsCnt);
  }
  
    //구독하기 백엔드
    const onBack = async() =>{
      const option ={
        method:"POST",
        url:`/api/subscribe/${myAddr}/${userAddress}`,
        data:"",
      }

      try{
          const data = await axios(option)
          console.log(data.status)
      }catch(err){
          console.log(err)
          console.log('구독하기백엔드에러')
        }
  } 

  useEffect(() => {    
    const getData = async () => {
      dispatch(openLoadingSpinner());
      const { count, status } = await getSubscriptionInfo(userAddress, myAddr);
      dispatch(closeLoadingSpinner());
      console.log(count, status)
      setSubscriptionsCnt(count)
      setIssubscribed(status)
    };
    if (isOpen) {
      detectMedia(thumnailImgUrl)
      getData();
      // console.log('모달 정보', userImgUrl, description)
    }
    return () => {
      setSubscriptionsCnt(null)
      setIssubscribed(null)
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
            {video ?
              <CardMedia className="video-player profile-image post-video" component="video" src={thumnailImgUrl ? thumnailImgUrl : empty} loading="lazy" style={{height: '100%' }} loop autoPlay={true} />
              :
              <CardMedia component="img" src={thumnailImgUrl ? thumnailImgUrl : empty} alt="item" />

            }
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
              <p>From <span>1 SSF</span> ‧ { subscriptionCnt } available</p>
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
              {/* 구독여부에 따라 보여지는 버튼 달라짐 */}
              
              <button className="primary-btn" onClick={subscribe}>구독하기 ( 1 SSF )</button>            
              <button className="secondary-btn"
              // onClick={onSub}
                onClick={() => {
                  if (!isSubscribed) {
                    alert('입장할 수 없습니다!')
                    return
                }
                closeModal()
                navigator(`/content/${userAddress}`)
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
