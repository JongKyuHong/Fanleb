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
import { DataGrid } from '@mui/x-data-grid';
    
import React, { useContext, useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import Page from '../components/Page';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';


const RankTitle = () => {
    return(
        <>
        <Box sx={{
            display:'flex',  color:"#FFFFFF", justifyContent:"space-evenly",

  


            }}>
            <Grid sx={{display:"flex", width:"7%", justifyContent:"center"}}>
                <Typography>
                    순위
                </Typography>
            </Grid>
            <Grid sx={{display:"flex", width:"20%",justifyContent:"center"}}>
            <Typography variant='h5' sx={{justifyItems:"center"}}>
                아이디
            </Typography>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"center", width:"10%"}}>
            <Typography>
                분류
            </Typography>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"center",  width:"10%"}}>
            <Typography>
                구독자 수
            </Typography>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"center",  width:"10%"}}>
                <Typography>
                    컨텐츠 수
                </Typography>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"center",  width:"10%"}}>
                <Typography>
                    거래 최고가
                </Typography>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"center",  width:"10%"}}>
                <Typography>
                    보유자 수
                </Typography>
            </Grid>

        </Box>
        <Divider/>

        </>
    )

}

const RankList =({userList}) => {

    const [sortedList, setSortedList] =useState(userList)

    // const columns = [
    //     { field: 'nickname', headerName: 'ID', width: 100 },
    //     { field: 'user_category_name', headerName: '분류', width: 100 },
    //     { field: 'subscription_cnt,', headerName: '구독자 수', type:'number',width: 70 },
    //     { field: 'contents_cnt', headerName: '컨텐츠 수', type:'number',width: 70 },
    //     { field: 'max_traded_price', headerName: '최고거래가격', type:'number',width: 100 },
    //     { field: 'owner_cnt', headerName: '보유자 수', type:'number',width: 70 },
    // ]

    useEffect( ()=>{
        setSortedList(userList)

        console.log('변경',userList)
    },[userList])

    return(
        <>
            {/* <SortButton userList={sortedList} setUserList={setSortedList}/> */}
            {sortedList.map((item) => <RankItem key={item.id} item={item}/>)}
        {/* <div style={{ height: 650, width: '100%', backgroundColor:"#FFFFFF" }}>
            <DataGrid
                rows={userList}
                columns={columns}
                pageSize={10}
            />
        </div> */}
        </>
    )

}
const RankItem =({item}) => {

    let {
        id,
        nickname,
        user_category_name,
        subscription_cnt,
        contents_cnt,
        max_traded_price,
        owner_cnt,
        img_url,
    } = item
    let default_img_url = 'http://j6a107.p.ssafy.io/static/media/main-logo.91c83371.png'

    return(
        <>
            <Box
                sx={{
                    display:'flex',
                    color:"#C2E0FF",
                    justifyContent:"space-around",
                    width:"100%",
                    margin:"10px",
                }}
            >
                <Grid sx={{width:"7%",display:"flex",justifyContent:"center", }}>
                    <Typography variant="h6">
                        {id}
                    </Typography>

                </Grid>
                <Grid sx={{display:"flex",justifyContent:"left",  width:"20%",}}>
                    <Avatar src={img_url?img_url:default_img_url} sx={{marginRight:"10px"}}/>
                    <Typography sx={{ color:"#FFFFFF", paddingLeft:"20px"}}>
                        {nickname?nickname:"무명"}
                    </Typography>
                </Grid>
                <Grid sx={{display:"flex",justifyContent:"center", width:"10%",}}>
                    <Typography>
                        {user_category_name?user_category_name:'미분류'}
                    </Typography>
                </Grid>
                <Grid sx={{display:"flex",justifyContent:"center", width:"10%",}}>
                   {subscription_cnt}
                </Grid>
                <Grid sx={{display:"flex",justifyContent:"center", width:"10%",}}>
                    {contents_cnt}
                </Grid>
                <Grid sx={{display:"flex",justifyContent:"center", width:"10%",}}>
                    {max_traded_price}
                </Grid>
                <Grid sx={{display:"flex",justifyContent:"center", width:"10%",}}>
                    {owner_cnt}
                </Grid>
            </Box>
            <Divider/>
        </>
    )

}

const PageButton = ({page,setPage,totalPages}) => {

    const pageChange = (e)=>{
        let now = e.target.value
        console.log(page,totalPages)
        switch(now){
            case '이전':
                if (page===1){
                    alert('시작페이지입니다')
                }else{
                setPage(page => page-1)}
                break
            case '다음':
                if (page===totalPages){
                    alert('마지막페이지입니다')
                }else{
                setPage(page => page+1)}
        }
    }

    return(
        <>
        <Button onClick={pageChange} value='이전'>
            이전
        </Button>
        <Button onClick={pageChange} value="다음">
            다음
        </Button>
        </>
    )

}

const SortButton = ({setUserList, userList, setSortId}) =>{
    const [sub, setSub] = useState(false) // 구독자순
    const [cont, setCont] = useState(false) // 컨텐츠 수
    const [price, setPrice] = useState(false) //거래 최고가 순
    const [own, setOwn] = useState(false) // 보유자 순

    const sortList = (e) => {
        let nowSort = e.target.value 
        switch(nowSort){
            case '구독자':
                setSortId('subscription_cnt')
                // setUserList(userList => userList.sort((a, b) =>{
                //     return b.subscription_cnt -a.subscription_cnt 
                // }))
                break
            case '컨텐츠':
                // setUserList(userList => userList.sort((a, b) =>{
                //     return b.contents_cnt -a.contents_cnt 
                // }))
                setSortId('contents_cnt')
                break
            case '최고가':
                // setUserList(userList => userList.sort((a, b) =>{
                //     return b.max_traded_price -a.max_traded_price 
                // }))
                setSortId('max_traded_price')
                break
            case '보유자':
                // setUserList(userList => userList.sort((a, b) =>{
                //     return b.owner_cnt -a.owner_cnt 
                // }))
                setSortId('owner_cnt')
                break
            }
        console.log(userList)

        }
    return(
        <>
        <Box sx={{display:"flex"}}>
            <Button onClick={sortList} value='구독자'>구독자 순</Button>
            <Button onClick={sortList} value='컨텐츠'>컨텐츠 순</Button>
            <Button onClick={sortList} value='최고가'>최고가 순</Button>
            <Button onClick={sortList} value='보유자'>보유자 순</Button>

        </Box>
        </>
    )

}


const Rank = () => {

    const [userList, setUserList] = useState([])
    const [pages, setPages] = useState(1)
    const [totalPages,setTotalPages]= useState(0)
    const [sortId,setSortId] = useState(null)

    const getList = async () => {
        const option = {
            method: "GET",
            url: `/api/ranking?page=${pages}&search[sortBy]=${sortId}`,
        }
        try{
            const {data} = await axios(option)
            setUserList(()=>data.data.content)
            console.log(option.url)
            console.log('rank on')
            console.log(data)
            console.log(userList.length !== 0)
            //기본정렬 구독자순
            // setUserList(data.data.content.sort( (a, b) =>{
            //     return b.subscription_cnt -a.subscription_cnt 
            // }))
        }catch(err){
            console.log(err)
        }
    }
    const getListPage = async () => {
        const option = {
            method: "GET",
            url: `/api/ranking?page=${pages}&search[sortBy]=${sortId}`,
        }
        try{
            const {data} = await axios(option)
            console.log('rank on')
            console.log(userList.length !== 0)
            setUserList(()=>data.data.content)
            setTotalPages(data.data.total_pages)
        }catch(err){
            console.log(err)
        }
    }

    useEffect( () =>{
        getList()
        console.log('리스트',userList)
    },[sortId])

    useEffect( () =>{
        getListPage()
        console.log("페이지변환")
    },[pages])

    return(
        <Page title="랭킹" minHeight="100%" alignItems="center" display="flex">
            <Container sx={{marginTop:"100px", 
            minWidth:"700px"
        
            }}>
                <Box sx={{color:"#FFFFFF", margin:"50px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <Typography variant="h3">
                        Fanleb 랭킹
                    </Typography>
                    <Typography sx={{margin:"10px"}} >
                        인기있는 셀럽을 찾아보세요!
                    </Typography>
                </Box>
            {/* <Stack direction="column" justifyContent="center" alignItems='center' sx={{ minWidth:"400px",}}> */}
                <Box sx={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    border:"solid 5px #C2E0FF",
                    borderRadius:'15px',
                    }}>
                    <Box sx={{display:'flex', justifyContent:"right", padding:"10px"}}>
                        <SortButton userList={userList} setUserList={setUserList} setSortId={setSortId} />
                    </Box>
                    <Box sx={{display:'flex', justifyContent:"center", padding:"10px"}}>
                        <PageButton page={pages} setPage={setPages} totalPages={totalPages}/>
                    </Box>
                    <RankTitle/>
                    {userList.length !== 0 && <RankList userList={userList}/>}
                    {/* 랭크리스트안에 버튼 */}
                </Box>

            {/* </Stack> */}
        </Container>
        </Page>

    )
}
export default Rank;