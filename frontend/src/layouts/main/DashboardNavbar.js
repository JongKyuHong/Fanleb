import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar, Avatar, CircularProgress, Input, OutlinedInput, InputAdornment } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from '../../redux/apiCalls';
import mainLogo from '../../images/main-logo.png';
// import home from './img/home.PNG';
// import messenger from './img/messenger.PNG';
// import add from './img/add.PNG';
// import like from './img/like.PNG';
// import SearchIcon from '@mui/icons-material/Search';
import IconButton from '../../theme/overrides/IconButton';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from "react-router-dom";
import { updateSuccess } from '../../redux/userSlice';
import Web3 from 'web3';

const Menu = () => (
  <>
     <Link to="/create"><p>등록하기</p> </Link>     
     <p>순위보기</p>     
    
  </>
 )

// 헤더 화면 (상단 메뉴바)
const DashboardNavbar = () => {
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;

  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72)    
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5)
    }
  }));

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { userInfo, pending, error } = useSelector(state => state.user);

  const [toggleMenu,setToggleMenu] = useState(false)
  //  const [user, setUser] = useState(false)

  const handleLogout = () => {
    setUser(false);
  }
  const handleLogin = () => {
    setUser(true);
  }
  // 지갑 주소 가져오기
  let accounts;
  const enableEth = async () => {
    if (userInfo.account) return;
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts'}).catch((err) => {
      console.log(err.code);
      
    })
    dispatch(updateSuccess(accounts[0]));
    console.log(accounts)
  }
  // SSAFY 네트워크 chainId: 79f5
  return (
    <RootStyle>
      <div className='navbar' style={{background: '#24252d'}}>
        <div className="navbar-links">
          <div className="navbar-links_logo">
            <Link to="/"> 
              <img src={mainLogo} alt="logo" />              
            </Link>
          </div>
          <div className="navbar-links_container">
            <input type="text" placeholder='검색' autoFocus={true} />
          <Menu />
          {/* {userInfo.account && <Link to="/"><p onClick={handleLogout}>Logout</p></Link> } */}
          
          </div>
        </div>
        <div className="navbar-sign">
        {userInfo?.account ? (
          <>
          <Link to="/create"> 
            <button type='button' className='primary-btn' >등록하기</button>
          </Link>
          <button type='button' className='secondary-btn'>지갑 변경</button>
          {/* <button type='button' className='secondary-btn' onClick={enableEth} >지갑 연결</button> */}
          {!pending ?          
            !error ? <Avatar onClick={() => updateUser(dispatch)} size="large" src={userInfo.url} sx={{ width: 56, height: 56 }} /> 
              : <Avatar onClick={() => updateUser(dispatch)} size="large" src={""} sx={{ width: 56, height: 56 }} />
            :
            <CircularProgress />
          }
          </>
        ): (
          <>
          <button type='button' className='secondary-btn' onClick={enableEth} >지갑 연결</button>
          {/* <Link to="/login"> 
          <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
          </Link>
          <Link to="/register"> 
            <button type='button' className='secondary-btn'>Sign Up</button>
          </Link> */}
          </>
        )}
        

        
        </div>
        <div className="navbar-menu">
          {toggleMenu ? 
          <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
            <div className="navbar-menu_container scale-up-center" >
              <div className="navbar-menu_container-links">
              <Menu />
              </div>
              <div className="navbar-menu_container-links-sign">
              {userInfo.account ? (
                <>
                <Link to="/create"> 
                  <button type='button' className='primary-btn' >Create</button>
                </Link>
                <button type='button' className='secondary-btn'>Connect</button>
                </>
              ): (
                <>
                  <Link to="/login"> 
                  <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
                  </Link>
                  <Link to="/register"> 
                    <button type='button' className='secondary-btn'>Sign Up</button>
                  </Link>                  
                </>
              )}
            
              </div>
              </div>
            )}
          </div>
          {/* {!pending ?          
            !error ? <Avatar onClick={() => updateUser(dispatch)} size="large" src={userInfo.url} sx={{ width: 56, height: 56 }} /> 
              : <Avatar onClick={() => updateUser(dispatch)} size="large" src={""} sx={{ width: 56, height: 56 }} />
            :
            <CircularProgress />
          } */}
      </div>
    </RootStyle>

    // <RootStyle>
    //   <nav className='navbar'>
    //     <div className='nav-wrapper'>
    //       <img src={mainLogo} className='brand-img' alt='' onClick={() => navigator('/main')} />
    //       <OutlinedInput
    //         // value={inputData}
    //         // onChange={handleInput}
    //         placeholder='검색'
    //         sx={{                            
    //           legend: { width: 0 },
    //           fieldset: { border: "none" },              
    //         }}
    //         className='search-box'
    //         startAdornment={<SearchIcon sx={{marginRight: '10px'}}/>}
    //       />
    //       <div className='nav-items'>
    //         <img src={home} className='icon' alt='' />
    //         <img src={messenger} className='icon' alt='' />
    //         <img src={add} className='icon' alt='' />
    //         <img src={like} className='icon' alt='' />
            
    //         <Box onClick={() => updateUser(dispatch)} sx={{ margin: '0 15px', cursor: 'pointer'}}>
    //           {!pending ?          
    //               !error ? <Avatar size="small" src={userInfo.url}/> 
    //               : <Avatar size="small" src={""} />
    //             :
    //             <CircularProgress />
    //           }                  
    //         </Box>
        
    //       </div>
    //     </div>
    //   </nav>

    //   {/* <ToolbarStyle>
    //     <Box sx={{ px: 2.5, py: 3 }}>
    //       <RouterLink to="/">
    //         <Logo />
    //       </RouterLink>
    //     </Box>

    //     <Box sx={{ flexGrow: 1 }} />

    //     <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 6.5 }} sx={{ mr: 10 }}>
    //       <Button to="/items" size="large" sx={{ fontSize: 17 }} component={RouterLink}>
    //         구매하기
    //       </Button>
    //       <Button to="/register" size="large" sx={{ fontSize: 17 }} component={RouterLink}>
    //         등록하기
    //       </Button>
    //       <Button to="/whosart" size="large" sx={{ fontSize: 17 }} component={RouterLink}>
    //         후즈컬렉션
    //       </Button>
    //       {!pending ?          
    //           !error ? <Avatar onClick={() => updateUser(dispatch)} size="large" src={userInfo.url} sx={{ width: 56, height: 56 }} /> 
    //           : <Avatar onClick={() => updateUser(dispatch)} size="large" src={""} sx={{ width: 56, height: 56 }} />
    //         :
    //         <CircularProgress />
    //       }                   
    //     </Stack>
    //   </ToolbarStyle> */}
    // </RootStyle>
  );
};

export default DashboardNavbar;
