import {Avatar, Box, Button, Card ,Container, Divider,Link, Stack, Typography, Grid, ImageListItem, Chip} from '@mui/material';

import Page from '../components/Page';
import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Trade from '../utils/Sale'
import getByTokenId from '../common/SaleInfoGetter';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/icons-material';

const ContentDetail = ()=>{
  let {detailId} = useParams()
  useEffect(()=>{
    console.log(detailId,'param')
  },[])

  return(
    <>
    <Detail detailId={detailId}/>
    </>

  )
}
const Detail = ({detailId}) =>{
  // let {detailId} = useParams()
  // const detailId = props
  const address = useSelector(state => state.user.userInfo.userAddress);
  const [detailInfo, setDetailInfo] = useState()
  const [price, setPrice] = useState()
  

  const getDetailInfo = async () =>{
    const option = {
      method: "GET",
      url: `/api/contents/${detailId}`,
    }
    try{
      const {data} = await axios(option)
      setDetailInfo(data.data)
    }catch(err){
      console.log(err)
      }
  }

  useEffect( ()=>{
    getDetailInfo()


  },[detailId])

  const toggletrade = async () => {
    const res = await getByTokenId(detailInfo.token_id)
    // var config = {
    //   method: 'get',
    //   url: `http://j6a107.p.ssafy.io/api/sales?token_id=${detailInfo.token_id}`,
    //   headers: { }
    // };
    
    // axios(config)
    // .then(function (response) {
    //   setPrice(response.data.)
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    Trade(address,res,detailInfo.price,detailInfo.token_id)
  }

  if(!detailInfo){
    return <Box sx={{ color:"#FFFFFF"}}>로딩..</Box>
    }
    return(
      <Page title="내용페이지" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
        <Container sx={{marginTop:"100px", color:"#FFFFFF"}}>
          <Stack 
            direction="column"
            divider={<Divider orientaiton="vertical" flexItem />}
            sx={{ 
              height:"500px",
              maxWidth:"1000px",
              minWidth:"460px",


              
            }}

          >
            <Box
              sx={{
                display:"grid",
                border:"5px solid #A4B8f7",
                borderRadius:"5px",
                justifyContent:"center",
                gridTemplateColumns:" 1fr 1fr",
                backgroundColor:"#3D3D3D",

              }}
              > 
              <Grid item
                className='image'
                sx={{
                  display:"grid",

                  justifyContent:"right",
                  alignItems:"center",
                }}
                >
                    <Box
                      component="img"
                      src={detailInfo.img_url}
                      sx={{width:"100%",
                          height:"100%",
                    }}
                    />


              </Grid>
              <Box className='content'
                sx={{
                  border:"1px solid #1212FF",
                  padding:"15px",
                  
                  
                  
                }}
                >
                    <Grid item>
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
                      }}
                    >
                      <Typography>
                        {detailInfo.content_description}
                      </Typography>
                    </Grid>
                    <Grid item>

                    </Grid>
                    <Grid item>
                      {/* <Typography>
                        {detailInfo.on_sale_yn === 'y'?"판매중":"판매종료"}
                      </Typography>
                      <Typography>
                        {detailInfo.created_at}
                      </Typography>
                      <Typography>
                        최근가격
                      </Typography>
                      <Typography>
                        36원
                      </Typography>
                    <Grid/> */}
                      <Divider />
                    <Grid item>
                      <Box sx={{padding:"20px",}}>
                        <Typography>
                          NFT 정보
                        </Typography>
                        <Box sx={{marginTop:"15px"}}>
                          현재 가격 : {detailInfo.price}
                        </Box>
                        <Box sx={{margin:"20px"}}>
                          <Button variant="contained" color="secondary" onClick={toggletrade}>
                            구매하기
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                
              </Box> 
            </Box>
          </Stack>
        </Container>
      </Page>
    

    )
}

export default ContentDetail;
