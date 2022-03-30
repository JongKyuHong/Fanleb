import {Avatar, Box, Button, Card ,Container, Divider,Link, Stack, Typography, Grid, ImageListItem} from '@mui/material';

import Page from '../components/Page';
import { useState, useEffect  } from 'react';



const ContentDetail = () =>{

  const lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'

  const url1 = 'https://w.namu.la/s/e9683a5adf478bf64a8ee9d3ff4aa24c2383fa7a8b3c9b6ad1419b27bd136a8ba8237e3c0d1d0ef5e158466681e895bf2644ce64af93a4bfd57f9ebfb1a7aaf9cbbac83720db6b093bb92987c7ad54379d93926be28635139a21dc8263064e72'

    return(
      <Page title="내용페이지" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
        <Container sx={{marginTop:"100px"}}>
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
                    <img src={url1}/>
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
                        제목입니다
                      </Typography>
                    </Grid>
                    <Grid item 
                      sx={{
                      }}
                    >
                      <Typography>
                        {lorem}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        판매시간
                      </Typography>
                      <Typography>
                        2022 11월 1일
                      </Typography>
                      <Typography>
                        최근가격
                      </Typography>
                      <Typography>
                        36원
                      </Typography>
                    <Grid/>
                      <Divider variant="middle" />
                    <Grid item>
                      <Button variant="contained" color="secondary">
                        현재 가격:1
                      </Button>
                      <Button variant="contained" color="secondary">
                        구매하기
                      </Button>
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