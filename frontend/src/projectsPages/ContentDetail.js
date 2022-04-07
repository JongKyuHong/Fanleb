import {Avatar, Box, Button, Card ,Container, Divider,Link, Stack, Typography, Grid, ImageListItem} from '@mui/material';

import Page from '../components/Page';
import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Trade from '../utils/Sale'
import getByTokenId from '../common/SaleInfoGetter';
import { useSelector } from 'react-redux';

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
  
  const getDetailInfo = async () =>{
    var config = {
      method: 'get',
      url: `http://j6a107.p.ssafy.io/api/contents/${detailId}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      setDetailInfo(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect( ()=>{
    getDetailInfo()
  },[detailId])
  const lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'

  const url1 = 'https://w.namu.la/s/e9683a5adf478bf64a8ee9d3ff4aa24c2383fa7a8b3c9b6ad1419b27bd136a8ba8237e3c0d1d0ef5e158466681e895bf2644ce64af93a4bfd57f9ebfb1a7aaf9cbbac83720db6b093bb92987c7ad54379d93926be28635139a21dc8263064e72'

  const toggletrade = async () => {
    const res = await getByTokenId(detailInfo.token_id)
    // if (res) {
    //   //const a = await Trade(address,res,detailInfo.price,detailInfo.token_id)
    // }
    //Trade(address,"0x27b47c55CDe4b7Ea71b2Bd6FDF9B3206182d3744",1, 93)
    console.log(res, 'res')
    Trade(address, res[0], res[1], detailInfo.token_id)
  }

  if(!detailInfo){
    return <Box sx={{ color:"#FFFFFF"}}>로딩..</Box>
    }
    return(
      <Page title="내용페이지" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
        <Container sx={{marginTop:"100px", color:"#FF1122"}}>
          <Stack 
            direction="column"
            divider={<Divider orientaiton="vertical" flexItem />}
            sx={{ 
              border:"solid 1px #10F12F",
              height:"500px",
              maxWidth:"1000px",
              minWidth:"460px",
              
            }}

          >
            <Box
              sx={{
                display:"grid",
                border:"1px solid #110111",
                justifyContent:"center",
                gridTemplateColumns:" 1fr 1fr",

              }}
              > 
              

              <Grid item
                className='image'
                sx={{
                  display:"grid",
                  border:"1px solid #ff1212",

                  justifyContent:"center",
                  alignItems:"center",
                }}
                >
                  <Grid item>
                    <img src={detailInfo.img_url}/>
                  </Grid>

              </Grid>
              <Box className='content'
                sx={{
                  border:"1px solid #1212FF",
                  
                  
                }}
                >
                  <Grid container
                   sx={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center", 
                   }}
                  >
                    <Grid item>
                      <Typography variant='h3'>
                        {detailInfo.content_title}
                      </Typography>
                    </Grid>
                    <Grid item 
                      sx={{
                      }}
                    >
                      <Typography>
                        {detailInfo.content_description}
                      </Typography>
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
                      <Divider variant="middle" />
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
                  </Grid>
                
              </Box> 
            </Box>
          </Stack>
        </Container>
      </Page>
    

    )
}

export default ContentDetail;
