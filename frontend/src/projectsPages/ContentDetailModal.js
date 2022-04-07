import {Avatar, Box, Button, Card ,Container, Divider,Link, Stack, Typography, Grid, ImageListItem, Chip, Modal} from '@mui/material';

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
    console.log('모달디테일로이도앻ㅆ습니다')
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
    >

    <Detail detailId={detailId}/>
    </Modal>
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
    var config = {
      method: 'get',
      url: `/api/sales?token_id=${detailInfo.token_id}`, // http://j6a107.p.ssafy.io/
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      Trade(address, response.data.data.sale_contract_address,response.data.data.price, detailInfo.token_id)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  if(!detailInfo){
    return <Box sx={{ color:"#FFFFFF"}}>로딩..</Box>
    }
    return(
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
    

    )
}

export default ContentDetailModal;
