import {Avatar, Box, Button, Card ,Container, Stack, Typography, Grid, ImageListItem
    ,Modal,
    Dialog,
    Chip,
    Divider,
    styled,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions} from '@mui/material';
    
import React, { useContext, useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import Page from '../components/Page';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

const Test = () => {
    const logOnAddress = useSelector(state => state.user.userInfo.userAddress)
    const contentId = "1A1P1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    // 구독정보 확인
    // const onSub = async() =>{
    //     const option ={
    //         method:"GET",
    //         url:`/api/subscribe/valid/${logOnAddress}/${contentId}`,
    //         }
        
    //     try{
    //         const data = await axios(option)
    //         console.log(data)
    //     }catch(err){
    //         console.log(err.response.data)
    //     }

    // }

    const buttonClick = (e) =>{
        let clicked = e.target.value
        switch(clicked){
            case '구독정보확인':
                onSub()
                break
            case '구독리스트':
                getSubList()
        }
    }

    //내가 구독하고 있는 리스트뽑기
    const getSubList = async()=>{
        const option ={
            method:"GET",
            url:`/api/subscribe/from/list?user_address=${logOnAddress}`,
            }
        
        try{
            const data = await axios(option)
            console.log(data.data.data.content)
        }catch(err){
            console.log(err.response.data)
        }
    }

    const onSub = async() =>{
        const option ={
            method:"GET",
            url:`/api/subscribe/valid/${logOnAddress}/${contentId}`,
            }
        
        try{
            const data = await axios(option)
            console.log(data)
            setOpen(false)
        }catch(err){
            console.log(err.response.data)
            setOpen(true)
        }

    }
    const history = useNavigate()

    const [open, setOpen] = useState(false)
    const handleClose = ()=>{
        setOpen(false)
        history('/main')

    }

    useEffect(()=>{
        onSub()
    },[])

    return (
        <Page title="구독" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
        <Container sx={{marginTop:"100px"}}>
        <Stack direction="column" justifyContent="center" alignItems='center' sx={{ minWidth:"400px",}}>
            <Typography variant="h1">
            테스트페이지입니다
            </Typography>
            <Button onClick={buttonClick} value='구독정보확인'> 구독정보버튼 </Button>
            <Button onClick={buttonClick} value='구독리스트'>구독리스트  </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    구독하고 있지 않습니다!
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} varlant="secondary">확인</Button>
                </DialogActions>
            </Dialog>

            </Stack>
        </Container>
        </Page>

    )
}
export default Test;