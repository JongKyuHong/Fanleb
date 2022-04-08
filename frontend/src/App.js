import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import './App.css';
import { UserInfoModal } from './components/UserInfoModal/UserInfoModal';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, initialUserInfo, openModal, removeAddress, updateAddress } from './redux/userSlice';
import axios from 'axios';
import { checkUser, getUser, registerUser } from './redux/apiCalls';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from './components/scrollTop';
import ThumnailModal from './components/ThumnailModal/ThumnailModal';
import SubscriptionModal from './components/SubscriptionModal/SubscriptionModal';
import Loading from './components/Loading';

export default function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user)
  const address = useSelector(state => state.user.userInfo.userAddress);
  const navigator = useNavigate();
  let account;
  let eth;
  let web3;
  // 배포된 컨트랙트의 address와 ABI를 사용해서 컨트랙트 객체 생성
  // 생성한 컨트랙트 객체에 접근해서 정의된 함수를 호출할 수 있음  
  function startApp() {        
    // 현재 연결된 web3 provider(예제에서는 Metamask)에 있는 계정을 조회하고,
    // 선택된 계정을 현재 계정에 해당하는 account 변수에 할당
    eth.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {      
      if (accounts.length > 0) {
        account = accounts[0];
        let res = await checkUser(account)
        if (!res) {
          dispatch(openModal())
          getUser(dispatch, account)
          console.log('앱 처음 시작했을 때: 기존 유저일 때')
        } else {          
          registerUser(account)
          dispatch(initialUserInfo())        
          dispatch(openModal())
          console.log('앱 처음 시작했을 때: 신규 유저일 때')
        }
        return
      }
      // 계정이 변경되는 것을 감지하고,
      // 선택된 계정을 현재 계정에 해당하는 account 변수에 할당
      eth.on('accountsChanged', function (accounts) {
        if (accounts.length > 0) {
          account = accounts[0];
          dispatch(openModal())
          getUser(dispatch, account)
          console.log('앱 처음 시작하고 지갑 변경되었을 때: 기존 유저일 때')
        } else {
          dispatch(initialUserInfo())
          dispatch(removeAddress())
          navigator('/')
          dispatch(closeModal())
          console.log('앱 처음 시작하고 지갑 변경되었을 때: 신규 유저일 때')
        }
        return
      });
    });
    // 이벤트 구독     
    // filter 옵션으로 현재 사용중인 계정의 주소가
    // to 변수에 저장된 이벤트만 필터링     
  }
  
  // 모든 리소스의 로딩이 완료되면 수행
  // 브라우저에 설치된 Web3 provider를 app에 연결
  window.addEventListener('load', function () {
    if (userInfo?.userAddress.length > 0) {
    } else {
      if (window.ethereum) {
        // latest
        eth = window.ethereum;
        web3 = new Web3(window.ethereum);
        // window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('latest')
        console.log(eth)
      } else if (window.web3) {
        // old
        web3 = window.web3;
        eth = window.web3;
        console.log('Injected web3 detected.');
        console.log(eth)
      } else {
        // not found
        const provider = new Web3.providers.HttpProvider('http://20.196.209.2:8545');
        web3 = new Web3(provider);        
        // console.log('No web3 instance injected, using local web3.');
        console.log(eth)
      }
      if (eth !== undefined) {
        console.log(typeof eth !== undefined)
        startApp();
      } else {
        
      }
    }
  });

  // 지갑 변경될 시, 유저 정보도 같이 바꿔주는 함수
  async function check (accounts) {
    // 지갑이 인식되면
    if (accounts.length > 0) {
      account = accounts[0];
      let res = await checkUser(account)
      // 신규 유저인지 체크
      if (!res) {
        // 기존 유저라면        
        dispatch(openModal())
        getUser(dispatch, account)
        console.log('처음 이후에 지갑 변경되었을 때: 기존 유저일 때')
      } else {
        // 신규 유저라면
        dispatch(initialUserInfo())
        registerUser(account)
        dispatch(openModal())
        console.log('처음 이후에 지갑 변경되었을 때: 신규 유저일 때')
      }
      navigator('/')
  
    } else {
      console.log('처음 이후에 지갑 변경되었을 떄: 연동할 지갑이 없습니다')
      dispatch(initialUserInfo())
      dispatch(removeAddress())
      navigator('/')
      dispatch(closeModal())
  
    }
    window.ethereum.removeListener('accountsChanged', check)
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500)
  }
  // // 계정이 변경되는 것을 감지하고,
  // // 선택된 계정을 현재 계정에 해당하는 account 변수에 할당
  if (window.ethereum !== undefined) {
    window.ethereum.on('accountsChanged', check); 
  }
  return (
    <>
      {/* <InfoModal /> */}
      <ThemeConfig>
        <ScrollToTop />        
        <Loading />
        <UserInfoModal userInfo={userInfo} address={address} />
        <ThumnailModal />
        <SubscriptionModal />
        <Router />
        <GlobalStyles />
      </ThemeConfig>
    </>
  );
}