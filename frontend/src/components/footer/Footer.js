import React from 'react'
import './footer.css'
import { AiOutlineInstagram,AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import logo from "../../images/main-logo.png"
const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
        <div>
          <img src={logo} alt="logo" />
          <p>FANLEB</p>
        </div>
        {/* <div>
          <h3>Get the lastes Updates</h3>
        </div>
        <div>
          <input type="text" placeholder='Your Email' />
          <button>Email Me!</button>
        </div> */}
        </div>
        <div className="footer-links_div">
          <h4>Fanleb</h4>
          <p>사이트소개</p>
          <p>서비스정책</p>          
        </div>
        <div className="footer-links_div">
          <h4>Support</h4>
          <p>고객센터</p>
          <p>이용약관</p>
          <p>개인정보처리방침</p>
          {/* <h4>Support</h4>
          <p>Help center</p>
          <p>Terms of service</p>
          <p>Legal</p>
          <p>Privacy policy</p> */}
        </div>
      </div>
      <div className="footer-copyright">
        <div>
        <p> © {(new Date().getFullYear())} FANLEB, Inc. All Rights Reserved</p>
        </div>
        <div>
          <AiOutlineInstagram size={25} color='white' className='footer-icon' />
          <AiOutlineTwitter size={25} color='white' className='footer-icon'/>
          <RiDiscordFill size={25} color='white' className='footer-icon'/>
          <FaTelegramPlane size={25} color='white'  className='footer-icon' />
        </div>

      </div>
    </div>
  )
}

export default Footer