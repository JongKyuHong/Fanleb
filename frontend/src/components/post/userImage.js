import { Skeleton } from '@mui/material';
import React from 'react'

function UserImg({avatarImg}) {

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