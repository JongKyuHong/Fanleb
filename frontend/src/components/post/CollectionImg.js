import React from 'react'

function CollectionImg({ imgUrl, empty, title }) {
  console.log(title, imgUrl)
    if (imgUrl?.includes('mp4')) {
      return <video style={{heigt: '100%'}} preload="none" loop="1">
        <source src={imgUrl} type="video/mp4" />
      </video>      
    } else {
      return <img
        className="profile-image"
        src={imgUrl ? imgUrl : empty}
        alt=""            
      />
    }      
}


export default CollectionImg