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
import { useParams } from 'react-router-dom';


import Page from '../components/Page';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

const Subscribe = ({urlId, open,setOpen}) => {

    // const [open,setOpen] = useState(false)
    const [contentUserInfo, setContentUserInfo] = useState(false)

    const logOnAddress = useSelector(state => state.user.userInfo.userAddress)
    // const contentAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'
    const contentAddress = urlId
    // const contentAddress = props
    const dispatch = useDispatch();
    // contentAddress = props
    
    // logOnAddress,

    useEffect(() => {
        if (open) {
            console.log(logOnAddress,'addr')
            console.log(urlId)
            getId()
        }
    },[open])


    //구독권등록하기
    const postSubscribe = async() =>{
           // 앞이 로그인/ 뒤에가 구도권가진유저

        const option ={
            method:"POST",
            url:`/api/subscribe/${logOnAddress}/${urlId}`,
            data:'',
            }
        
        try{
            const data = await axios(option)
            console.log(data)
            console.log(data.status)
            setOpen(close)
        }catch(err){
            console.log(err.response.data)
            const error = err.response.data.result
            alert(`구독할 수 없습니다. ${error}`)
        }

    }
    // 입장할때 사용할 것
    // const getSubscribe= async() =>{
    //     const option ={
    //         method:"GET",
    //         url:`/api/contents?page=1&user_address=${urlId}`,
    //         }
    //     try{
    //         const data = await axios(option)
    //         console.log(data)
    //         console.log(data.status)
    //     }catch(err){
    //         console.log(err)
    //     }

    // }
    // 구독할 유저정보 불러오기
    const getId = async ()=>{
        const option ={
            method:"GET",
            url:`/api/users/address?user_address=${urlId}`,
            }
        try{
            const {data} = await axios(option)
            setContentUserInfo(data.data)
            console.log("구독부러오기성공")
        }catch(err){
            console.log(err)
        }
    }
    
    const onClick = (e)=>{
        const now = e.target.value
        console.log(now,'onclick')

        switch(now){
            case 'confirm':
                postSubscribe()
                break
            case 'cancel' :
                setOpen(false)
                break
        }
        
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const buttonClick = () =>{
        setOpen(true)
    }


    return (
        // <Page title="구독" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
        // <Container sx={{marginTop:"100px"}}>
        // <Stack direction="column" justifyContent="center" alignItems='center' sx={{ minWidth:"400px",}}>
        //     <Typography variant="h1">
        //         구독페이지이당
        //     </Typography>
        //     <Button onClick={buttonClick}> 구독창 띄우기 </Button>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>구독권 구매하기 </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {contentUserInfo.nickname}을(를) 구독합니다.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="secondary" onClick={onClick} value="confirm">
                            확인
                        </Button>
                        <Button variant="secondary" onClick={onClick} value="cancel">
                            취소
                        </Button>
                    </DialogActions>
                </Dialog>
        //     </Stack>
        // </Container>
        // </Page>

    )
}
export default Subscribe;