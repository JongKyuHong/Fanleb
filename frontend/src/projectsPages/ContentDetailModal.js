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
    }catch(err){
      console.log(err)
    }
  }

  useEffect( ()=>{
    getDetailInfo()
  },[detailId])

  const toggletrade = async () => {
    Trade(address, saleInfo.sale_contract_address, saleInfo.price, detailInfo.token_id)
  }
  let text= '가수 겸 뮤지컬 배우 김준수가 클래스가 다른 럭셔리 드레스룸을 공개했다.지난 6일 방송된 채널A  또한 그의 옷이 걸려 있는 옷걸이에는 모두의 예명을 로고처럼 박혀있어 시선을 모았다. 김준수는 라고 설명했다.  김원희는  이에 김준수는 답했고 출연자들은 “정말 신기하다. 클래스가 다르다”라고 감탄했  후 김준수는 마음에 드는 옷들을 꺼내서 피팅하기 시작했다. 그는라며 힘겨워하는 모습을 보였다'

  if(!detailInfo){
    return <Box sx={{ color:"#FFFFFF"}}>로딩..</Box>
    }
    return(
        <Container sx={{marginTop:"100px", color:"#FFFFFF"
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
                          height:"300px",
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
                        <Typography>
                          NFT 정보
                        </Typography>
                        <Box sx={{marginTop:"15px"}}>
                          현재 가격 : {saleInfo.price}
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
          {/* </Stack> */}
        </Container>
    

    )
}

export default ContentDetailModal;
