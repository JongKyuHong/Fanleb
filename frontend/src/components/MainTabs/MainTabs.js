import Box from '@mui/material/Box';
import './tabs.css';
import { useEffect, useRef, useState } from 'react';
import { display, style } from '@mui/system';

const MainTabs = (({ category, setCategory, isMoved, setIsMoved }) => {
  const [position, setPosition] = useState(false);
  const ref = useRef(null);
  // 탭 클릭 시, 상단으로 스크롤 자동 이동
  const handleChange = (newValue) => {
    setCategory(newValue);
    // if (isMoved) {
      
    // } else {
    //   ref.current?.scrollIntoView({ behavior: 'smooth' })
    //   setIsMoved(true)
    // }
    // if (!status) {
    //   setStatus(true)
      window.scroll({top: 650, behavior: 'smooth'})
    //   console.log('true')
    // } else {      
    //   // window.scroll({ top: 650, behavior: 'smooth' })
    //   window.scroll({ top: 708, behavior: 'smooth' })
    //   window.scroll({ top: 709, behavior: 'smooth' })
    //   console.log('false')
    // }
    // window.scroll({ top:709, behavior: 'smooth' })    
    // window.scroll({ top: 550, behavior: 'smooth' })
    // if (!status) {      
    //   window.scroll({ top: 651, behavior: 'smooth' })
    //   console.log('true 상태')
    // } else {
    //   window.scroll({ top: 650, behavior: 'smooth' })      
    //   console.log('false 상태')
    // }
    // setStatus(!status)
    // console.log(ref.current.scrollHeight, ref.current.offsetHeight)
    // const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    // if (bottom) {
    //   window.scroll({ top: 500, behavior: 'smooth' })
    //   console.log('이동')
    // }
  };

  // 페이지 바닥에 닿았는지 체크
  const handleScroll = () => {
    // const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    // if (bottom) {
    //   setPosition(true)
    // } else {
    //   setPosition(false)
    // }
  };
  
  useEffect(() => {
    // window.addEventListener('scroll', handleScroll, {
    //   passive: true
    // });

    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, []);


  return (
    <Box            
      className="profile-actions" ref={ref}
      style={position ? { display: 'none' } : {zIndex: 1, background: '#24252d'}} onScroll={(e) => handleScroll(e)}
    >
      <div className={`profile-actions__item ${category === 'singer' ? 'profile-actions__item--active' : ''}`} onClick={() => handleChange('singer')}>
        {/* <svg aria-label="" className="_8-yf5 " color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 48 48" width="12"><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg> */}
        <svg aria-label="" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path></svg>
        <span>가수</span>
      </div>
      <div className={`profile-actions__item ${category === 'actor' ? 'profile-actions__item--active' : ''}`} onClick={() => handleChange('actor')}>
        <svg aria-label="" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path></svg>
        <span>배우</span>
      </div>
      <div className={`profile-actions__item ${category === 'celeb' ? 'profile-actions__item--active' : ''}`} onClick={() => handleChange('celeb')}>
        <svg aria-label="" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path></svg>
        <span>셀럽</span>
      </div>
      <div className={`profile-actions__item ${category === 'general' ? 'profile-actions__item--active' : ''}`} onClick={() => handleChange('general')}>
        <svg aria-label="" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path></svg>
        <span>일반인</span>
      </div>
    </Box>
    // <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
    //   <Tabs value={value} onChange={handleChange} centered>
    //     <Tab label="Item One" />
    //     <Tab label="Item Two" />
    //     <Tab label="Item Three" />
    //   </Tabs>
    // </Box>
  )
});
export default MainTabs;