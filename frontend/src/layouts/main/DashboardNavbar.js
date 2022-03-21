import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar, Avatar, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../components/Logo';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from '../../redux/apiCalls';

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
  const { userInfo, pending, error } = useSelector(state => state.user);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ px: 2.5, py: 3 }}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 6.5 }} sx={{ mr: 10 }}>
          <Button to="/items" size="large" sx={{ fontSize: 17 }} component={RouterLink}>
            구매하기
          </Button>
          <Button to="/register" size="large" sx={{ fontSize: 17 }} component={RouterLink}>
            등록하기
          </Button>
          <Button to="/whosart" size="large" sx={{ fontSize: 17 }} component={RouterLink}>
            후즈컬렉션
          </Button>
          {!pending ?          
              !error ? <Avatar onClick={() => updateUser(dispatch)} size="large" src={userInfo.url} sx={{ width: 56, height: 56 }} /> 
              : <Avatar onClick={() => updateUser(dispatch)} size="large" src={""} sx={{ width: 56, height: 56 }} />
            :
            <CircularProgress />
          }                   
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
