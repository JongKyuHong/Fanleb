import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import empty from "../post/empty-image.jpg";
function SubscriptionImage({ subscription }) {
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [nickname, setNickname] = useState("");
  const [category, setCategory] = useState("");
  const getUserInfo = async (addr) => {
    const { data } = await axios(`/api/users/address?user_address=${addr}`)
    return data
  }
  
  useEffect(() => {
    if (subscription) {
      axios(subscription).then(res => {    
        setImage(res.data.imgUrl)
        setAuthor(res.data.author)
        getUserInfo(res.data.author)
          .then(data => {
            setNickname(data.data.nickname)
            setCategory(data.data.users_category.user_category_name)
        })
      })
    }
    return () => {
      setImage([])
    }
  }, [])
  return (<Grid item xs={3}>
            <img src={image ? image : empty} alt="" style={{ display: 'inline-block', width: '150px', height: '150px' }} />
            <p style={{color: 'white', textAlign: 'center'}}>{ category }</p>
            <p style={{ color: 'rgb(32, 129, 226)', textAlign: 'center' }}> { nickname }</p>  
          </Grid>)
}

export default SubscriptionImage;