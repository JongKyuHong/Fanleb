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
import { useNavigate, useParams } from 'react-router-dom';


import Page from '../components/Page';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

const confirmSub = ({contentId}) => {
    const logOnAddress = useSelector(state => state.user.userInfo.userAddress)
    // 구독정보 확인
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
            if (logOnAddress===contentId){
                setOpen(false)
            }else{
            setOpen(true)
            }

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
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    구독하고 있지 않습니다!
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} varlant="secondary">확인</Button>
                </DialogActions>
            </Dialog>
        
        </>

    
    )
}
export default confirmSub;