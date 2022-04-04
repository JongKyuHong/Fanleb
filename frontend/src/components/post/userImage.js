import { Skeleton } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserImg({address}) {
  const [avatarImg, setAvatarImg] = useState("");
  const [load, setLoad] = useState(false);
  useEffect(() => {
    axios
      .get(`api/users/address?user_address=${address}`)
      .then((res) => setAvatarImg(res.data.data.img_url))
    return () => {
      setAvatarImg("")
    }
  }, [])
  if (!avatarImg) {
    return <Skeleton variant='circular' width={100} height={100} />
  }
  return (    
    <img
      src={avatarImg}
      className="avatar-image"        
      alt="profile"
    />
  )
}

export default UserImg;