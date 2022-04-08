import {Avatar, Box, Button, Card, Container, Divider,Link, Stack, Typography, Grid, ImageListItem, Chip, Modal, CardMedia} from '@mui/material';

import Page from '../components/Page';
import { useState, useEffect  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Trade from '../utils/Sale'
import getByTokenId from '../common/SaleInfoGetter';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/icons-material';

const ContentDetailModal = ()=>{
  let {detailId} = useParams()
  let navigate = useNavigate()
  useEffect(()=>{
    console.log(detailId,'param')
  },[])

const [open,setOpen] = useState(true)
const handleClose = e => {
    setOpen(false)
    // e.stopPropagation()
    navigate(-1)
}
  return(
    <>
    <Modal
        open={open}
        onClose={handleClose}
        sx={{
          overflow: 'scroll',
          height: '100%',
        }}
    >
    <>
    <Detail detailId={detailId}/>
    </>
    </Modal>
    </>
  )
}
const Detail = ({detailId}) =>{
  // let {detailId} = useParams()
  // const detailId = props
  let navigate = useNavigate()
  const address = useSelector(state => state.user.userInfo.userAddress);
  const [detailInfo, setDetailInfo] = useState()
  const [price, setPrice] = useState()
  const [saleInfo, setSaleInfo] = useState()

  const getDetailInfo = async () =>{
    var config = {
      method: 'get',
      url: `/api/sales?token_id=${detailId}`,
      headers: { }
    };

    await axios(config)
    .then(function (response) {
      setSaleInfo(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });

    const option = {
      method: "GET",
      url: `/api/contents/${detailId}`,
      headers : {}
    }
    try{
      const {data} = await axios(option)
      setDetailInfo(data.data)
      // console.log(data.data.img_url)
      detectMedia(data.data.img_url)     
    }catch(err){
      console.log(err)
    }

  }

  useEffect( ()=>{
    getDetailInfo()
  },[detailId])  

  const toggletrade = async () => {
    const data = await Trade(address, saleInfo.sale_contract_address, saleInfo.price, detailInfo.token_id)
    navigate(-1)
  }

  const [video, setVideo] = useState(false);
  const playVideo = () => {
    ref.current.play()
  }
  const pauseVideo = () => {
    ref.current.pause()
  }
  
  const detectMedia = (inputUrl) => {
    if (inputUrl === null || inputUrl === NaN || inputUrl === undefined) {
      return
    }
    const images = ["jpg", "gif", "png"]
    const videos = ["mp4", "3gp", "ogg"]
    // const url = new URL(inputUrl)
    // let extension = inputUrl?.split(".")
    // extension = extension[extension?.length - 1]
    
    let extension = inputUrl.split(".")
    // console.log(extension)
    extension = extension[extension.length - 1]
    if (images.includes(extension)) {
      setVideo(false)      
      
    } else if (videos.includes(extension)) {      
      setVideo(true)      
    }
  }
    // if (images.includes(inputUrl)) {
    //   setVideo(false)      
      
    // } else if (videos.includes(inputUrl)) {      
    //   setVideo(true)      
    // }


  if(!detailInfo){
    return <Box sx={{ color:"#FFFFFF"}}>로딩..</Box>
    }
    return(
        <Container sx={{marginTop:"50px", color:"#FFFFFF"
        }}>
          {/* <Stack 
            direction="column"
            divider={<Divider orientaiton="vertical" flexItem />}
            sx={{ 
              minHeight:"100%",
              maxWidth:"1000px",


              
            }}

          > */}
            <Box
              sx={{
                display:"grid",
                border:"5px solid #A4B8f7",
                borderRadius:"5px",
                justifyContent:"center",
                gridTemplateColumns:" 1fr 1fr",
                backgroundColor:"#3D3D3D",
                width:"100%"
              }}
              > 
              <Grid item
                className='image'
                sx={{
                  display:"grid",

                  justifyContent:"center",
                  alignItems:"center",
                }}
                >
            {video ?
              <Box
                sx={{
                  width: "100%",
                  height:"100%",
                }}
              >

              <iframe                
                src={detailInfo.img_url ? detailInfo.img_url : empty}       
                autoPlay
                allowFullScreen
                loading="lazy"
                width="100%"
                height="100%"
              />

                
              </Box>
            :
              <Box
                component="img"
                src={detailInfo.img_url}
                sx={{width:"100%",
                    height:"100%",
                  }}
              />
            }

              </Grid>
              <Box className='content'
                sx={{
                  padding:"15px",
                  
                  
                  
                }}
                >
                    <Grid item sx={{marginLeft:"10px", marginTop:"10px"}}>
                      <Typography variant='h4'>
                        {detailInfo.content_title}
                      </Typography>
                      <Box sx={{display:"flex", justifyContent:"right", padding:"10px"}}>

                        {detailInfo.on_sale_yn ==='y'?<Chip label="판매중" color="info" />:<Chip label="판매종료" color="info" />}
                      </Box>
                      <Box sx={{display:"flex", justifyContent:"right", paddingRight:"15px"}}>
                        <Typography variant="h6">
                          {detailInfo.collection.collection_name}
                        </Typography>
                      </Box>
                    <Divider/>
                      <Box sx={{display:"flex", justifyContent:"right", paddingRight:"15px"}}>
                        <Typography >
                          {detailInfo.created_at}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item 
                      sx={{padding:"30px",
                          height:"200px",
                          overflow:"auto",
                      }}
                    >
                      <Typography>
                        {detailInfo.content_description}
                      </Typography>
                    </Grid>
                    <Grid item>

                    </Grid>
                    <Grid item>
                      <Divider />
                    <Grid item>
                      <Box sx={{padding:"20px",}}>
                        <Typography variant='h6'>
                          NFT 정보
                        </Typography>
                      <Box sx={{padding:"20px",}}>
                        <Typography >
                          지갑 주소: {detailInfo.owner_address}
                        </Typography>
                      </Box>
                        <Box sx={{marginTop:"15px"}}>
                          {saleInfo ? `현재 가격 :  ${saleInfo.price}`:null}
                        </Box>
                        {saleInfo? <Box sx={{margin:"20px"}}>
                          <Button variant="contained" color="secondary" onClick={toggletrade}>
                            구매하기
                          </Button>
                        </Box>:null}
                      </Box>
                    </Grid>
                  </Grid>
                
              </Box> 
            </Box>
          {/* </Stack> */}
        </Container>
    

    )
}

export default ContentDetailModal;
