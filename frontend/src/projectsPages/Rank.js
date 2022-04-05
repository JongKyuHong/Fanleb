import axios from 'axios';
import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import {Avatar, Box, Button, Card ,Container, Link, Stack, Typography, Grid, ImageListItem} from '@mui/material';
import Page from '../components/Page';
import '../components/post/bids.css'

const RankTitle = () => {
    return(
        <>
        </>
    )

}

const RankList =({userList}) => {

    useEffect( ()=>{
        console.log(userList)
    },[])

    return(
        <>
            <PageButton/>
            {userList.map((item, idx) => <RankItem key={idx} item={item}/>)}
            
            <Typography sx={{ color:"#FFFFFF",}}>테스트</Typography>
        </>
    )

}
const RankItem =({item}) => {

    const {
        cur_subscribe_cnt,
        id,
        img_url,
        max_subscribe_cnt,
        nickname,
        user_address,
        user_description,
    } = item
    let users_category_name = 'unname'
    useEffect(()=>{
        if (item.users_category === null){
            users_category_name = 'unname'
        }
        else{
            users_category_name = item.users_category   
        }
    }, [])



    return(
        <>
            <PageButton/>
            <Box
                sx={{
                    display:'flex',
                    color:"#FF00FF",
                }}
            >
                <Grid>
                    <Typography sx={{ color:"#FFFFFF",}}>
                        {nickname?nickname:"무명"}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography>
                        {users_category_name}
                    </Typography>
                </Grid>
                <Grid>
                    {}
                </Grid>
                <Grid></Grid>
                <Grid></Grid>
            </Box>
        </>
    )

}

const PageButton = () => {
    const [page, setPage] = useState(1)

    return(
        <>
        </>
    )

}


const Rank = () => {

    const [userList, setUserList] = useState([])
    const pages = 1

    const getList = async () => {
        const option = {
            method: "GET",
            url: `/api/users/list?page=${pages}`,
        }
        try{
            const {data} = await axios(option)
            setUserList(data.data.content)
            console.log('rank on')
            console.log(data)
            console.log(userList.length !== 0)
        }catch(err){
            console.log(err)
        }
    }

    useEffect( () =>{
        getList()
        console.log('리스트',userList)
    },[])

    return(
        <Page title="랭킹" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
            <Stack>
                <RankTitle/>
                {userList.length !== 0 && <RankList userList={userList}/>}
                {/* 랭크리스트안에 버튼 */}

            </Stack>

        </Page>

    )
}

export default Rank;