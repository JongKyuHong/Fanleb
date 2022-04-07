import {Avatar, Box, Button, Card ,Container, Stack, Typography, Grid, ImageListItem
,Modal,
Dialog,
Chip,
Divider,
styled} from '@mui/material';

import React, { useContext, useState, useEffect  } from 'react';
import { Routes, useParams, } from 'react-router-dom';
import { ContentContext } from './ContentContext';


import Page from '../components/Page';
import { Link } from "react-router-dom";

import dump from './dump.json';
import profile_dump from './profile_dump.json';
import axios from 'axios';
import { set } from 'lodash';
import { LocalConvenienceStoreOutlined, SettingsPowerOutlined } from '@mui/icons-material';
import ContentDetail from './ContentDetail';
import ConfirmSub from './ConfirmSub';
import { useSelector } from 'react-redux';
// 프로필 관련
const ProfileCard = ({contentId}) => {
    const {profile, setProfile} = useContext(ContentContext)

    const getProfile = async() =>{
        const option = {
            method:"GET",
            url:`/api/users/address?user_address=${contentId}`,
        }
        try{ 
            const data = await axios(option)
            const result = await data.data.data
            setProfile(result)
            console.log(result,"프로필")
            console.log(profile)
        }catch(err){
            console.log(err)
            console.log("프로필에러")
        }
    }

    useEffect(()=>{
        let isComponentMounted = true
        if(isComponentMounted){
            getProfile()
        }
        return () =>{
            isComponentMounted = false
        }
    },[])
    return ( 
        <Box 
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                padding:3,
                paddingLeft:20,
            }}
        >
            {profile && <ProfileImage/> }
            {profile && <ProfileDetail props={profile}/> }
        </Box>
    )
}

const ProfileDetail = ({props}) => {
    const {id, max_subscribe_cnt, nickname, user_description, users_category, cur_subscribe_cnt, contents_cnt } = props

    return (
    <Box
        sx={{
            maxWidth:'450px',
            padding:1,
            marginLeft:15
        }}
    >
        <Box>
            <Typography variant="h5">
                {props && nickname}
                <Chip label={users_category.user_category_name} color="secondary" sx={{marginLeft:2}}
                />
            </Typography>
        </Box>
        <Box
            sx={{
                display:'flex',
                marginTop:2,
            }}
        >
            <Grid>
                {/* <Typography>
                    게시물  
                </Typography> */}
            </Grid>
            <Grid>
                <Typography>
                    구독자 {props && cur_subscribe_cnt}
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    컨텐츠 {props && contents_cnt}
                </Typography>
            </Grid>
            <Grid>
                {/* <Typography>
                    소유자 미정명
                </Typography> */}
            </Grid>
        </Box>
        <Box sx={{width:"400px", wordBreak:"break-all", marginTop:2}}>
            <Typography>
                {props && user_description}

            </Typography>
        </Box>
    </Box>
    )
}

const ProfileImage = () => {
    const {profile} = useContext(ContentContext)

    return (
        <Box
        sx={{backgroundColor:'FF0000',
            height:'100%',
            borderRadius:'15px',
            alignItems:'center' ,
            justifyContent:'center'                 
        }}                       
    >
        <Avatar 
            sx={{
                width:'200px',
                height:'200px',
            }}
            src={profile.img_url}
            // src={urls}
        >
        </Avatar>
    </Box>

    )
}

const Thumbnail = ({props}) => {
    const {content_title, content_description, created_at,
    img_url,id,token_id} = props

    const {onModal,setOnModal, onToken, setOnToken,} = useContext(ContentContext)

    const [isHover,setIsHover] = useState(0)
    const handleOpen = () => setOnModal(true);
    const handleClose = () => setOnModal(false);


    useEffect(()=>{
        console.log("아이템불러오기")
    },[])

    const goToContent= () =>{
        console.log("clicked")
        console.log(content_title)
        console.log(token_id)
        setOnModal(true)
        setOnToken(token_id)
    }
    const default_img ='http://j6a107.p.ssafy.io/static/media/main-logo.91c83371.png'
    // const ImageListItem= styled('ImageListItem')({
    //     opacity: (isHover?0.5:'none')
    // })
    
    return (
        <>
        <Grid item sx={{ display:"grid", width:"400px",}}
            onClick={goToContent}
            onMouseOver={()=>setIsHover(1)}
            onMouseOut={()=>setIsHover(0)}

        > 
            {/* <Link to={`detail/${token_id}`}> */}
                <ImageListItem 
                    key={token_id} 
                    sx={{margin:2,padding:2,width:"400px",height:"400px"}}
                    // {...(isHover? 'sx={{opacity:0.5}}' : null)}

                >
                    <img
                    src={`${img_url? img_url:default_img}?h=100`}
                    // srcSet={`${img_url? img_url:default_img}?w=300&h=300&fit=crop&dpr=2 2x`}
                    alt={default_img}
                    loading="lazy"/>
                </ImageListItem>
            {/* </Link> */}
        </Grid>
{/* 
        <Dialog
            open={onModal}
            onClose={handleClose}
        
        >
            <Link to={`detail/${token_id}`}>
                {token_id}번 게시글로 이동합니다
            </Link>
        </Dialog> */}

        </>

    )
}
const CollectionList = ({props}) => {
    const {collection_name, id, user_address} = props
    const {contentId} = useContext(ContentContext)

    const [collectionItem, setCollectionItem] = useState()
    const getCollectionItem = async() =>{
        const option = {
            method: "GET",
            url: `/api/collections/${id}/contents?page=1&user_address=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`
        }
        try{
            const {data} = await axios(option)
            setCollectionItem(data.data.content[0])
            console.log(data.data.content[0],'collectiondata', id)
            if(collectionItem.img_url === undefined){
                setCollectionItem({...collectionItem, img_url:''})
                console.log('hihi')
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        console.log("콜렉션불러오기")
        getCollectionItem()
    },[])

    const default_img ='http://j6a107.p.ssafy.io/static/media/main-logo.91c83371.png'

    return (
        <>
            <Grid item sx={{ display:"grid",border:"solid #1211ff", minwidth:"300px",}}
            >
            {/* <Link to={`${contentId}/${id}`}> */}
                <ImageListItem key={collectionItem && collectionItem.img_url} sx={{
                    border:'1px solid #22ff00',
                }}>
                    <img
                    src={`${collectionItem?collectionItem.img_url:default_img}?w=300&h=300&fit=crop&auto=format`}
                    srcSet={`${collectionItem? collectionItem.img_url:default_img}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
                    alt={collection_name}
                    loading="lazy"/>
                </ImageListItem>
            {/* </Link> */}
        </Grid>
        </>

    )
}
// 아이템 보기
const ContentCardList = ({contentId})=>{
    const {now, items, setItems, setOnModal, collectionId, setNow} = useContext(ContentContext)

    const [loading, setLoading] = useState(0)
    const handleOpen = () => setOnModal(true);
    const handleClose = () => setOnModal(false);

    // const [items, setItems] = useState()
    let url = ''
    
    const getItems = async() =>{
        console.log(now)
        switch(now){
            case "collection":
                url = `/api/collections?page=1&user_address=${contentId}`
                break;
            case "all":
                url = `/api/contents?page=1&user_address=${contentId}`
        }
        const option = {
            method: "GET",
            url: url
        }
        console.log(url,"url",now)
        try{
            const getData = await axios(option)
            setItems(getData.data.data.content)
            console.log(getData.data.data.content,'getData')
            console.log(items,"itemson")
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        const start = async ()=>{
            await getItems()
            console.log(items,"items")
            setLoading(1)
            console.log(now,"현재의상태입니다",loading)
            console.log(now==='all')
        }
        start()

    },[now])

    useEffect(()=>{
        const getCollections = async ()=>{
            const option = {
                method: "GET",
                url:`api/collections/${collectionId}/contents?page=1&user_address=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`
            }
            try{const getData = await axios(option)
            setItems(getData.data.data.content)
            setNow('')
            }catch(err){
                console.log(err)
            }
        }
        if(Boolean(collectionId)){
            getCollections()
            console.log(now,'콜렉션ㄴ나우')
        }
        console.log(items,'콜렉션불러온다음')
    },[collectionId])


    const goToContent = () =>{
        console.log("goto")
    }

    if(!items){
        return <Box sx={{ color:"#1122FF"}}>
            loading...
            </Box>
    }   
    // if(!items){
    //     return <Box sx={{ color:"#FFFFFF"}}> 로딩..
    //     <ContentCardList contentId= {contentId}/>
    //     </Box>
    return(
        <>
        {items && now ==="all" && items.map( (item) => (<Link key={item.token_id} to={`detail/${item.token_id}`}> <Thumbnail key={item.token_id} props ={item} onClick={handleOpen} /> </Link>)) }

        {/* {now ==="all" && <Typography sx={{color:"#1122FF"}} > 로딩돼</Typography>} */}

        {now ==="collection" && items && items.map( (item,key) => (<CollectionList key={key} props ={item} onClick={handleOpen}/> ))}

        {/* {items && collectionId && items.map( (item,key) => (<Thumbnail key={key} props ={item} onClick={handleOpen} />)) } */}

        {/* <Modal
                open={onModal}
                onClose={handleClose}
            >
                <ContentDetail props={onClick}/>
        </Modal> */}

        </>
        
        
        
        )
    }
    // {/* {items && items.map( (item,key) => {<Grid sx={{ display:"grid",border:"solid #1211ff", minwidth:"300px",}} item xs={4} key={key} > <Thumbnail key={key} props ={item}/> </Grid>} )} */}

// 컬렉션 관련
// const CollectionList = ({collection, user_id}) => {
//     const [itemList, setItemList] = useState([])
//     // userId, collection_id
//     const getItems = async() =>{
//         const option = {
//             method:"GET",
//             url:`/api/collections/${collection}/contents?page=1&user_address=${user_id}`,
//         }
//         try{ 
//             const {data} = await axios(option)
//             setItemList(data.data.content)
//             console.log(data.data.content,"컨텐츠")
//             console.log("콜렉션아이템조회성공")
//             console.log(collection)
//             console.log(itemList,'itemlist')
//         }catch(err){
//             console.log(err)
//             console.log("콜렉션아이엠에러")
//             console.log(collection,user_id)
//         }
//     }

//     useEffect( ()=>{
//         let isComponentMounted = true
//         if(isComponentMounted){
//             if(collection !== undefined){
//             getItems()
//             }
//         }
//         return () =>{
//             isComponentMounted = false
//         }
//     },[collection])

//     return(
//         <>
//          {itemList.map( (item,key) => <Grid sx={{   display:"grid",
//                         border:"solid #1211ff", 
//                         minwidth:"300px",
//                     }} item xs={4} key ={key} > <Thumbnail key ={key} props = {item}/> </Grid>)}
//         </>
//     )
// }

//리스트 고르는 버튼
const MenuButton = ({contentId}) =>{
    const {now, setNow} = useContext(ContentContext)
    const [all, setAll] = useState("contained")
    const [collection, setCollection] = useState("text")

    const setShowItem = (event) =>{
        const state = event.target.value
        setNow(state)
        console.log(state,'실행 됨')

    }
    const status = ()=>{
        if(now ==="all"){
            setAll("contained")
            setCollection("text")
        }else if(now === "collection"){
            setAll("text")
            setCollection("contained")
        }
    }
    useEffect(()=>{
        status()
    },[now])

    

    return(
        <Box>
            <Button variant={all} value="all" onClick={setShowItem}>
                전체보기
            </Button>
            <Button variant={collection} value="collection" onClick={setShowItem}>
                컬렉션 보기
            </Button>
        </Box>
    )
}

// const SelectList = ({props,listOn,setListOn,setNow}) => {
//     const {collection_name, id, user_address} = props
//     const [selected, setSelected] = useState('text')
    
//     // useEffect(()=>{
//     //     if(listOn === collection_name){
//     //         setSelected("contained")
//     //         setNow(id)
//     //     }else{
//     //         setSelected("text")
//     //     }
//     // }, [listOn])

//     const setShowItem = (event) =>{
//         const state = event.target.value
//         setListOn(state)
//         console.log('실행 됨')
//     }
//     return (
//         <Box>
//             <Button variant={selected} value={collection_name} onClick={setShowItem}>
//                 {collection_name}
//             </Button>
//         </Box>
//     )
// }

const Content = () => {
    const {contentId, collectionId} = useParams()
    const [items, setItems] = useState() // 메인페이지 보여주는 아이템들
    const [now, setNow] = useState("all") // 현재 보여주는 콜렉션종류
    const [userData, setUserData] = useState() // 프로필데이터
    const [profile, setProfile] = useState()


    //
    const [onModal, setOnModal] = useState(false)
    const [onToken, setOnToken] = useState(false)
    useEffect(()=>{
        // console.log(items,"main items")
        // console.log(items === true)
        // console.log(now,"now")
    },[])

    // 구독하고있는 유저인지 확인 하기
    const logOnAddress = useSelector(state => state.user.userInfo.userAddress)
    
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
    // const getStart = async() =>{
    //     const option = {
    //         method: "GET",
    //         url: `/api/contents?page=1&user_address=${contentId}`
    //     }
    //     try{
    //         const {data} = await axios(option)
    //         setOnStart(data.data.content)
    //         console.log(data.data.content,'시작성공')
    //         const cnt = data.data.content
    //         setUserData(cnt.length)
    //     }catch(err){
    //         console.log(err)
    //         console.log("스타트에러")
    //     }
    // }
    // const getContentList = async () =>{
    //     const option2 = {
    //         method: "GET",
    //         url: `/api/collections?page=1&user_address=${contentId}`
    //     }
    //     try{
    //         const getcon = await axios(option2)
    //         const data = await getcon.data.data.content
    //         setItems(data)
    //         // console.log(data)
    //         console.log(getcon.data.data.content,'content')
    //     }catch(err){
    //         console.log(err)
    //         console.log("초기에러",contentId)
    //     }
    // }


    // useEffect(() => {
    //     getStart()
    //     // getContentList()
    // //     let isComponentMounted = true
    // //     const seq = async()=>{
    // //         if (isComponentMounted) {
    // //             await getStart()
    // //             await getContentList()  
    // //             console.log("초기성공")
    // //             console.log(items,'안아이템')
    // //         }     
    // //     }
    // //     seq()
    // //     return () =>{
    // //         isComponentMounted = false
    // //     }
    // },[])

    // useEffect(()=>{
    //     if(now !== undefined){
    //     setView(now)}
    //     console.log(now,"now")
    // },[now])

    // if(!items){
    //     return <Box sx={{ color:"#FFFFFF"}}> 로딩..
    //     <ContentCardList contentId= {contentId}/>
    //     </Box>

    return (
    <ContentContext.Provider 
        value={{
            items, setItems,
            now, setNow,
            userData, setUserData,
            //
            onModal, setOnModal,
            onToken, setOnToken,
            contentId, collectionId,
            profile, setProfile,
        }}>
            {/* <ConfirmSub contentId={contentId}/> */}
        <Page title="컨텐츠" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
        <Container sx={{marginTop:"100px"}}>
        <Stack direction="column" justifyContent="center" alignItems='center' sx={{ minWidth:"400px",}}>
                <Box
                    sx={{display:'flex',
                        maxWidth:"1000px",
                        width:'100%',
                        justifyContent:'center',
                        color:"#FFFFFF",

                    }}
                    >
                    <ProfileCard contentId={contentId} userData={userData}/>
                </Box>
                <Divider variant="middle" />
                <Box sx={{marginBottom:3,}}>
                    <Grid
                        sx={{display:'flex'}}
                        >
                        <MenuButton contentId={contentId} />
                        {/* {items.map( item => <SelectList key={item.id} props={item} listOn={listOn} setListOn={setListOn} setNow={setNow} /> )} */}
                    </Grid>
                </Box>
                {/* 내용물 리스트 */}
                <Container
                    sx={{
                        display:"grid",
                        maxWidth:"1000px",
                        width:"100%",
                        gridTemplateColumns:"repeat(3,1fr)"

                    }}
                    >
                    <ContentCardList contentId= {contentId}/>
                    {/* {notOn !== 1?<CollectionList collection={view} user_id={contentId}/> : onStart.map( (item,key) => <Grid sx={{   display:"grid",
                        border:"solid #1211ff", 
                        minwidth:"300px",
                    }} item xs={4} key ={key} > <Thumbnail key ={key} props = {item}/> </Grid>)} */}
                </Container>
            </Stack>
        </Container>
        </Page>
    </ContentContext.Provider>
        )
    }

export default Content;
