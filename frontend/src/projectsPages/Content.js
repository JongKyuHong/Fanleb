import {Avatar, Box, Button, Card ,Container, Stack, Typography, Grid, ImageListItem
,Modal,
Dialog,
Chip,
Divider,
styled,
getStepButtonUtilityClass,
CardMedia} from '@mui/material';

import React, { useContext, useState, useEffect, useCallback  } from 'react';
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
import { useInView } from "react-intersection-observer"
import InfiniteScroll from 'react-infinite-scroll-component';
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
                marginRight:"10px",
            }}
        >
            <Grid>
                {/* <Typography>
                    게시물  
                </Typography> */}
            </Grid>
            <Grid sx={{marginRight:"10px"}}>
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
    const [video, setVideo] = useState(false);
    const detectMedia = (inputUrl) => {
        if (inputUrl === null || inputUrl === NaN || inputUrl === undefined) {
            return
        }
        const images = ["jpg", "gif", "png"]
        const videos = ["mp4", "3gp", "ogg"]        
        let extension = inputUrl.split(".")
        
        extension = extension[extension.length - 1]
        if (images.includes(extension)) {
            setVideo(false)      
        
        } else if (videos.includes(extension)) {      
            setVideo(true)      
        }
    }
    useEffect(()=>{
        console.log("아이템불러오기")
        detectMedia(img_url)
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
            <Grid item 
                sx={{ 
                    display:"grid", 
                    justifyContent:"center",
                    alignItems:"center",
                    margin:"15px",

                }}

                onClick={goToContent}
                onMouseOver={()=>setIsHover(1)}
                onMouseOut={()=>setIsHover(0)}
            > 
                <Link to={`detail/${token_id}`}>
                    {video ?
                        <CardMedia
                            component="video"
                            loading="lazy"
                            src={img_url ? img_url : default_img}
                            style={{
                                display:"block",
                                width:"300px",
                                height:"300px",
                                objectFit:"cover",
                                borderRadius:"10px",
                            }}
                        />
                        :
                        <CardMedia
                            component="img"
                            src={img_url ? img_url : default_img} style={{
                                display:"block",
                                width:"300px",
                                height:"300px",
                                objectFit:"cover",
                                borderRadius:"10px",
                            }}
                    />  
                    }
                    {/* <img src={img_url?img_url:default_img} style={{
                                display:"block",
                                width:"300px",
                                height:"300px",
                                objectFit:"cover",
                                borderRadius:"10px",
                            }}
                    /> */}
                        {/* <Box
                            component="img"
                            src={img_url?img_url:default_img}
                            sx={{
                                display:"block",
                                border:"solid 1px #F8f8",
                                width:"100%",
                                objectFit:"cover",
                            }}
                        /> */}
                </Link>
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
            url: `/api/collections/${id}/contents?page=1&user_address=${contentId}`
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
        console.log(collectionItem)
    },[])

    const default_img ='http://j6a107.p.ssafy.io/static/media/main-logo.91c83371.png'

    return (
        <>
            <Grid item sx={{ display:"grid", 
                    justifyContent:"center",
                    alignItems:"center",
                    margin:"15px",
                    color:"#FFFFFF"    
                }}
            >
            {/* <Link to={`${contentId}/${id}`}> */}
                    <img
                    src={`${collectionItem?collectionItem.img_url:default_img}`}
                    style={{
                        display:"block",
                        width:"300px",
                        height:"300px",
                        objectFit:"cover",
                        borderRadius:"10px",
                    }}
                    />
                    <Typography>
                        {collectionItem && collectionItem.collection.collection_name}
                    </Typography>

            {/* </Link> */}
        </Grid>
        </>

    )
}
// 아이템 보기
const ContentCardList = ({contentId})=>{
    const {now, items, setItems, setOnModal, collectionId, setNow, setPage,page} = useContext(ContentContext)

    const handleOpen = () => setOnModal(true);
    const handleClose = () => setOnModal(false);
    
    // const [items, setItems] = useState()
    let url = ''
    
    const [hasMore, setHasMore] = useState(true);
    //

    const [loading, setLoading] = useState(false)
    cosnt [maxPage, setMaxPage] = useState(false)
    const [ref, inView] = useInView()

    const getItems = useCallback(async() =>{
        console.log(now,'getitme시작 나우')
        switch(now){
            case "collection":
                url = `/api/collections?page=${page}&user_address=${contentId}`
                break;
            case "all":
                url = `/api/contents?page=${page}&user_address=${contentId}`
                break;
            case "buy":
                url = `/api/contents/address?page=${page}&user_address=${contentId}`
        }
        const option = {
            method: "GET",
            url: url
        }
        console.log(url,"url",now)
        try{
            const getData = await axios(option)
            const getRes = getData.data.data.content
            setMaxPage(getRData.data.data.total_page)
            console.log(now,'now입니다')
            if (now ==='all'){
            await setItems(items.concat(getRes))
            console.log(getData)
            console.log(getData.data.data.content,'getData')
            console.log("전체보기")
            }
            if (now ==='buy'){
                console.log(url,'바이유알엘')
                const buyItems = getData.data.data.content
                console.log(getRes,'asdasdas')
                setItems(items.concat(buyItems))
                console.log("바이 성공")
            }
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }, [page])

    useEffect(()=>{
        getItems()
        return () => {
            setItems([])
            setLoading(false)
        }
    },[getItems])

    useEffect(()=>{
        console.log(now,page,items,'now changeggege')
        getItems()
        return () => {
            setItems([])
            setLoading(false)
        }
    },[now])

    useEffect(()=>{
       if (inView && !loading && prevState !== maxPage){
           setPage(prevState=> prevState + 1)
        }
        return () => {            
            setLoading(false)
        }
    }, [inView, loading])

    // useEffect(()=>{
    //     const getCollections = async ()=>{
    //         const option = {
    //             method: "GET",
    //             url:`api/collections/${collectionId}/contents?page=1&user_address=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`
    //         }
    //         try{const getData = await axios(option)
    //         setItems(getData.data.data.content)
    //         setNow('')
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    //     if(Boolean(collectionId)){
    //         getCollections()
    //         console.log(now,'콜렉션ㄴ나우')
    //     }
    //     console.log(items,'콜렉션불러온다음')
    // },[collectionId])

    if(!items){
        return <Box sx={{ color:"#1122FF"}}>
            loading...
            </Box>
    }   
    return(
        <>
        {/* <InfiniteScroll
            dataLength={items?.length}
            next={fetchData}
            hasMore={hasMore}
            Loader={<h4>Loading...</h4>}
        > */}
            {items && now !== 'collection' && items.map( (item) => (<div key={item.token_id}  ref={ref}><Thumbnail key={item.token_id} props ={item} onClick={handleOpen} /> </div>)) }
        {/* </InfiniteScroll> */}

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
    const {now, setNow, setPage, setItems,} = useContext(ContentContext)
    const [all, setAll] = useState("contained")
    const [collection, setCollection] = useState("text")
    const [buy, setBuy] = useState("text")

    const setShowItem = (event) =>{
        const state = event.target.value
        if (now !== state){
            setItems([])
            setPage(0)
            setNow(state)
            setPage(1)
        }
        console.log(now,'실행 됨')

    }
    const status = ()=>{
        if(now ==="all"){
            setAll("contained")
            setCollection("text")
            setBuy("text")
        }else if(now === "collection"){
            setAll("text")
            setBuy("text")
            setCollection("contained")
        }else if(now === "buy"){
            setAll("text")
            setBuy("contained")
            setCollection("text")
        }
    }
    useEffect(()=>{
        status()
    },[now])

    

    return(
        <Box>
            <Button color="secondary" variant={all} value="all" onClick={setShowItem}>
                전체보기
            </Button>
            {/* <Button color="secondary" variant={collection} value="collection" onClick={setShowItem}>
                컬렉션
            </Button> */}
            <Button color="secondary" variant={buy} value="buy" onClick={setShowItem}>
                구매아이템
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
    const [items, setItems] = useState([]) // 메인페이지 보여주는 아이템들
    const [now, setNow] = useState("all") // 현재 보여주는 콜렉션종류
    const [userData, setUserData] = useState() // 프로필데이터
    const [profile, setProfile] = useState()
    const [page, setPage] = useState(1)


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
            page, setPage,
        }}>
            <ConfirmSub contentId={contentId}/>
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
                    </Grid>
                </Box>
                {/* 내용물 리스트 */}
                <Box container
                    sx={{
                        display:"grid",
                        border:"5px solid",
                        borderRadius:"15px",
                        // gridTemplateRows:"repeat(3,1fr)",
                        gridTemplateColumns:"repeat(3, 1fr)",
                    }}
                    >
                        <ContentCardList contentId= {contentId}/>


                </Box>
            </Stack>
        </Container>
        </Page>
    </ContentContext.Provider>
        )
    }

export default Content;
