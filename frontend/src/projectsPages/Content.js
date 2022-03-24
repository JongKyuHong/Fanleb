
import React from 'react'
import {Avatar, Box, Button, Card ,Container, Link, Stack, Typography, Grid, ImageListItem} from '@mui/material';

import { useState, useEffect  } from 'react';
import Page from '../components/Page';

import dump from './dump.json';
import profile_dump from './profile_dump.json';
// 프로필 관련
const ProfileCard = () => {
    const [profile, setProfile] = useState({})

    useEffect(()=>{
        setProfile(profile_dump)
        // console.log(profile,'프로필카드에서불러온거')
    },[])
    return ( 
        <Box 
            sx={{
                display:'flex',
                border:'solid 10px #c3f0f9',
                justifyContent:'center',
                alignItems:'center',
            }}
        >
            <ProfileImage props={profile}/>
            <ProfileDetail props={profile}/>
        </Box>
    )
}

const ProfileDetail = ({props}) => {
    const {id, contents_count, subscribed, holder, text } = props

    return (
    <Box
        sx={{
            maxWidth:'450px',
        }}
    >
        <Box>
            <Typography>
                {props.id}
            </Typography>
        </Box>
        <Box
            sx={{
                display:'flex'
            }}
        >
            <Grid>
                <Typography>
                    게시물  {contents_count}
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    구독자 {subscribed}
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    소유자 {holder}
                </Typography>
            </Grid>
        </Box>
        <Box sx={{maxWidth:"300px"}}>
            <Typography>
                {text}
            </Typography>
        </Box>
    </Box>
    )
}

const ProfileImage = (props) => {
    const {profile_img} = props
    return (
        <Box
        sx={{backgroundColor:'FF0000',
            height:'100%',
            border:'solid 1px',
            borderRadius:'15px',
            alignItems:'center' ,
            justifyContent:'center'                 
        }}                       
    >
        <Avatar 
            sx={{
                width:'100px',
                height:'100px',
            }}
            variant="square"
            src={profile_img}
        >
        </Avatar>
    </Box>

    )
}

// 아이템 관련
// const Item = () => {
//     return (
//     )
// }


// const Thumbnailist = () => {
//     return (


//     )
// }

// 아이템리스트 
const Thumbnail = ({props}) => {
    const {title, likes, text, date, img} = props
    useEffect(()=>{
        console.log(props.img)
    }, [])

    return (
        <>
        <ImageListItem key={img} sx={{
                border:'1px solid #22ff00',
            }}>
            <img
            src={`${img}?w=300&h=300&fit=crop&auto=format`}
            srcSet={`${img}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
            alt={title}
            loading="lazy"/>
        </ImageListItem>
        </>

    )
}


//리스트 고르는 버튼
const SelectList = () => {
    const [listOn, setListOn] = useState('all')

    const setShowItem = (event) =>{
        const state = event.target.value
        setListOn(state)
        console.log('실행 됨')
    }


    return (
        <Box>
            <Button variant="text" value='all' onClick={setShowItem}>
                전체보기
            </Button>
            <Button variant="text" value='theme' onClick={setShowItem}>
                주제별보기
            </Button>
            <Typography>
                현재 상태 = {listOn}
            </Typography>

        </Box>
    )
}

const Content = () => {
    const [items, setItems] = useState([])

    // 초기 아이템 값 9개
    const [list, setList] = useState({items:9, preItem:0})



    // const handleScroll = () => {
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const scrollTop = document.documentElement.scrollTop;
    //     const clientHeight = document.documentElement.clientHeight;

    //     if(scrollTop + clientHeight >= scrollHeight){
    //         setList({preitem:items, items:items+=3});
    //         dump.slice(list.preItem, list.items)
    //         console.log('스크롤 자르기')
    //     }}
          
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     console.log('스크롤링')
    //     console.log(document.documentElement.scrollHeight
    //         ,document.documentElement.scrollTop
    //        ,document.documentElement.clientHeight)
    //     return () => {window.removeEventListener('scroll', handleScroll)}
    //     },[])

    useEffect(() => {
        const defaultDump = dump.slice(list.preItem, list.items)
        setItems(defaultDump)
        console.log(list,'자른값')
    },[])

    // useEffect(() =>{
    //     const addDump = dump.slice(list.preItem,list.items)
    //     setItems(addDump)
    //     console.log(list,'추가자르기')
    // },[dump])


  return (
    <Page title="컨텐츠" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
        <Container sx={{marginTop:"100px"}}>
            <Stack direction="column" justifyContent="center" alignItems='center' sx={{border:'solid #112ff2', minWidth:"400px",}}>
                <Box
                    sx={{display:'flex',
                        maxWidth:"1000px",
                        border:'solid',
                        width:'100%',
                        justifyContent:'center',

                    }}
                >
                    <ProfileCard/>
                </Box>
                <Box>
                    <Grid
                        sx={{display:'flex'}}
                    >
                        <SelectList/>
                    </Grid>
                </Box>
                {/* 내용물 리스트 */}
                <Container
                    sx={{
                        display:"grid",

                        border:"solid #ff12ff",
                        maxWidth:"1000px",
                        width:"100%",
                        gridTemplateColumns:"repeat(3,1fr)"

                    }}
                >
                    {items.map( item => <Grid sx={{   display:"flex",
                        border:"solid #1211ff", 
                        minwidth:"300px",
                    }} item xs={4} > <Thumbnail key ={item.key} props = {item}/> </Grid>)}
                </Container>
            </Stack>
        </Container>
    </Page>
  )
}

export default Content;
