import React, { useEffect, useState } from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import seller1 from '../../images/seller1.jpg'
import verify from '../../images/verify.png'
import coin from '../../images/coin.png';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import empty from '../post/empty-image.jpg';
const Header = () => {
  const [userData, setUserData] = useState([]);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };
  useEffect(() => {
    const getUserData = async () => {
      const {data} = await axios(`api/users/list?page=1&search[query]=`)
      setUserData(data.data.content)
    }
    getUserData();
    return () => {
      setUserData([])
    }
  }, [])
  return (
    <div className='header'>
      <div className="header-content">
        <div>
          <h1>스타의 특별한 SNS를 구독하고, 모으고, 거래하세요</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div>
      <div className="header-slider">
        <h1>인기 스타</h1>
        <Slider {...settings} className='slider'>
          {userData.map((data, index) => {
            return <div className='slider-card' key={index}>
              <p className='slider-card-number'>{index + 1}</p>
              <div className="slider-img">
                <img src={data.img_url ? data.img_url : empty} alt="" style={{  objectFit: 'cover', width: '100px', height: '100px'}} />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={'/'}>
                <p className='slider-card-name'>{data.nickname}</p>
              </Link>
              {/* <p className='slider-card-price'>5.250 <span>ETH</span></p> */}
            </div>
          })}
            {/* <div className='slider-card'>
              <p className='slider-card-number'>2</p>
              <div className="slider-img">
                <img src={seller1} alt="" />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>제임스 본드</p>
              </Link>
              <p className='slider-card-price'>4.932 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>3</p>
              <div className="slider-img">
                <img src={seller1} alt="" />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>제임스 본드</p>
              </Link>
              <p className='slider-card-price'>4.620 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>4</p>
              <div className="slider-img">
                <img src={seller1} alt="" />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>제임스 본드</p>
              </Link>
              <p className='slider-card-price'>4.125 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>5</p>
              <div className="slider-img">
                <img src={seller1} alt="" />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>제임스 본드</p>
              </Link>
              <p className='slider-card-price'>3.921 <span>ETH</span></p>
            </div>
            <div className='slider-card'>
              <p className='slider-card-number'>6</p>
              <div className="slider-img">
                <img src={seller1} alt="" />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>제임스 본드</p>
              </Link>
              <p className='slider-card-price'>3.548 <span>ETH</span></p>
            </div> */}
        </Slider>
      </div>
    </div>
  )
}

export default Header