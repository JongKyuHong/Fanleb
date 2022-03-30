import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import './App.css';
import { UserInfoModal } from './components/UserInfoModal/UserInfoModal';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from './redux/userSlice';

export default function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user)
  let account;
  // 배포된 컨트랙트의 address와 ABI를 사용해서 컨트랙트 객체 생성
  // 생성한 컨트랙트 객체에 접근해서 정의된 함수를 호출할 수 있음
  function startApp() {        
    
    // 현재 연결된 web3 provider(예제에서는 Metamask)에 있는 계정을 조회하고,
    // 선택된 계정을 현재 계정에 해당하는 account 변수에 할당
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
      account = accounts[0];          
      // console.log(account)
      dispatch(updateAddress(account))
    
      // 계정이 변경되는 것을 감지하고,
      // 선택된 계정을 현재 계정에 해당하는 account 변수에 할당
      window.ethereum.on('accountsChanged', function (accounts) {
        account = accounts[0];
        // console.log(account)
        dispatch(updateSuccess(account))
      });
    });
    // 이벤트 구독     
    // filter 옵션으로 현재 사용중인 계정의 주소가
    // to 변수에 저장된 이벤트만 필터링     
  }
  
  // 모든 리소스의 로딩이 완료되면 수행
  // 브라우저에 설치된 Web3 provider를 app에 연결
  window.addEventListener('load', function () {
    if (window.ethereum) {
      // latest
      web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('latest')
    } else if (window.web3) {
      // old
      web3 = window.web3;
      console.log('Injected web3 detected.');
    } else {
      // not found
      const provider = new Web3.providers.HttpProvider('http://20.196.209.2:8545');
      web3 = new Web3(provider);
      console.log('No web3 instance injected, using local web3.');
    }
    startApp();
  });
  return (
    <>
      {/* <InfoModal /> */}
      <ThemeConfig>
        <UserInfoModal userInfo={userInfo} />
        <Router />
        <GlobalStyles />
      </ThemeConfig>
    </>
  );
}