import { Divider, Grid, Modal, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CreateSubscriptionNFT, getMySubscriptionNFT, getSsafyToken } from '../../utils/Subscription';
import SubscriptionImage from "./SubscriptionImage";
import './Subs.css';
import { closeSubsModal } from '../../redux/modalSlice';
function SubscriptionModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.modal.isSubsOpen);
  const { imageUrl, userAddress, userNickname, userDescription, userCategory } = useSelector(state => state.user.userInfo);
  const [pic, setPic] = useState({});
  const [count, setCount] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const closeModal = () => {
    dispatch(closeSubsModal());
  };
  const createSubs = async () => {    
    console.log(userAddress, pic.file, count)
    if (count > 10) {
      alert('한번에 그렇게 많이 발행할 수 없습니다.')
      return
    }
    if (count === undefined || count <= 0) {
      alert('발행할 구독권 개수를 올바르게 입력해주세요.')
      return
    }    
    if (pic.file === undefined) {
      alert('구독권으로 발행할 이미지를 올려주세요.')
      return
    }
    const ok = confirm(`해당 이미지로 ${count}개의 구독권을 발행하시겠습니까? 한번 발행한 구독권은 수정할 수 없습니다.`);
    if (!ok) return
    try {      
      await CreateSubscriptionNFT(userAddress, pic.file, count);
      alert('3초후 페이지가 새로고침 됩니다. 잠시만 기다려주세요.')
      setTimeout(() => {
        window.location.reload();
      }, 3000)
      
    } catch (err) {
      console.log(err)
    }
  }

  const uploadFile = (e) => {    
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = async () => {
      setPic({
        file : file,
        previewURL : reader.result
      })
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }
  // const getToken = () => {
  //   getSsafyToken(userAddress)
  // }
  useEffect(() => {
    const getData = async () => {
      const res = await getMySubscriptionNFT(userAddress)
      setSubscriptions(res)
      console.log(res,'ㄻ나럼니ㅏ런')
    };
    if (isOpen) {
      getData()
    }
    return () => {
      setSubscriptions([]);
    }
  }, [isOpen])
  return (
    <Modal
      open={isOpen}
      onBackdropClick={closeModal}
      // disableScrollLock={true}
      sx={{
        overflow: 'scroll',
        height: '100%',
      }}
    >
      <div className='item section__padding' style={{ width: '90%', background: '#24252d', borderRadius: '30px', }}>
        <div style={{ width: '100%', paddingTop: '50px' }}>
          
          {subscriptions.length > 0 ?
            <>
            <h1 style={{color: 'white', textAlign: 'center', marginBottom: '20px'}}><span style={{}}>{ userNickname }</span> 님이 보유 중인 NFT 구독권</h1>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '2rem 4rem', overflow: 'auto', height: '500px' }}>
                {subscriptions.map((subscription, index) => {
                  return <SubscriptionImage subscription={subscription} key={index} />}
                  )
                }
            </Grid>
            </>
            :
            <h1 style={{color: 'white', textAlign: 'center', marginTop: '200px'}}>보유 중인 구독권이 없습니다.</h1>
        }
        </div>
        {/* <div className="item-image">          
        </div> */}
          <div className="item-content">
            <div className="item-content-title">
            <h1>NFT로 구독권 발행하기</h1>
            <p style={{marginTop: '10px'}}>내가 발행한 구독권을 보유한 사용자에게만 컨텐츠 열람 권한이 주어집니다.</p>
            {/* <p>From <span>4.5 SSF</span> ‧ 20 of 25 available</p> */}
            <div style={{marginTop: '40px'}}>
              <span style={{ color: 'white' }} >발행할 구독권 개수 :</span>
              <input
                type='number'
                style={{
                  // color: 'white',
                  // background: '#2A2D3A',
                  // borderRadius: '10px',
                  padding: '5px',
                  minWidth: '30%',
                  marginLeft: '10px',                  
                }}
                className='input-class'
                value={count}
                onChange={e => setCount(e.target.value)}
                max={5}
                min={1}
                maxLength={1}
              />
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <h3 style={{color: 'white'}}>구독권 이미지: </h3>
            <input type={'file'} onChange={uploadFile} style={{ marginTop: '20px' }} />
            <img src={pic.previewURL} style={{height: '150px'}} />
          </div>
   
            <div className="item-content-detail">
            <p>설명</p>
            <Divider sx={{margin: '20px 0'}} />
            <p style={{ overflow: 'hidden', width: 'auto' }}><span style={{color: 'rgb(32, 129, 226)'}}>{ userNickname } </span>의 Address : {userAddress} </p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn" onClick={createSubs}>구독권 발행</button>
            {/* <button className="secondary-btn"
              onClick={getToken}
              // onClick={() => {
              //   if (addr) {
              //     closeModal()
              //     navigator(`/content/${userAddress}`)
              //   } else {
              //     alert('지갑 연결이 필요합니다.')
              //     window.open('https://metamask.io/download/', '_blank')
              //   }
              // }}
              >토큰 얻기</button> */}
            </div>
          </div>
      </div>
    </Modal>
  )
}

export default SubscriptionModal;