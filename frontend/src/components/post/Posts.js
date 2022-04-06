import { useCallback, useEffect, useState } from 'react';
import Post from './Post';
import MainTabs from '../MainTabs/MainTabs';
import './bids.css'
import bids1 from '../../images/bids1.png'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Skeleton from '../skeleton/skeleton';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/system';
import InfiniteScroll from 'react-infinite-scroll-component';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  // const [value, setValue] = useState(0);
  const [category, setCategory] = useState('celeb');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onItemClicked = () => {
    alert('클릭!')
  };  
  
  // const handleScroll = (e) => {     
  //   const scrollHeight = e.target.documentElement.scrollHeight;
  //   const currentHeight = Math.ceil(
  //   e.target.documentElement.scrollTop + window.innerHeight
  //   );
  //   if (currentHeight + 200 >= scrollHeight) {
  //     setIsLoading(true);
  //     if (value === 0) {
  //         getData('singer')
  //       } else if (value === 1) {
  //         getData('actor');
  //       } else if (value === 2) {
  //         getData('celeb');
  //       } else if (value === 3) {
  //         getData('general');
  //       }     
  //   }
  // };
  // let currentPage = 1;
  // const getData = useCallback(async (category) => {
  //   const { data } = await axios(
  //     {
  //       method: "GET",
  //       url: `api/collections/list?search[sortBy]=${category}&search[query]=&page=${currentPage}`,      
  //       headers: {}
  //     })
  //     console.log(posts, data.data.content, currentPage)
  //   if (currentPage === data.data.total_pages) {
  //     currentPage++;
  //     window.removeEventListener('scroll', handleScroll)            
  //     setPosts(oldData =>oldData.concat(data.data.content))
  //     setIsLoading(false)
  //     return
  //   } else if (currentPage >= data.data.total_pages) {
  //     return
  //   }
  //   else {
  //     setPosts(oldData =>oldData.concat(data.data.content))
  //     setIsLoading(false)
  //     currentPage++;
  //     return
  //   }
  // }, [handleScroll])   
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const fetchCollections = async () => {
    if (!hasMore) return
    try {
      const res = await axios(
        `api/collections/list?search[sortBy]=${category}&search[query]=&page=${page}`
        )
      return res.data.data.content;
    } catch (err) {      
      return 'err'
    }
  };

  const fetchData = async () => {
    const collectionsFromServer = await fetchCollections();
    if (collectionsFromServer === 'err') {
      setHasMore(false)
      return
    }
    // const collectionsFromServer = res.data.data.content
    // if (posts.length === 0 || posts.length < 12) {
    //   setHasMore(false)
    //   return
    // }
    if (posts.length === 0 || posts.length < 12 || collectionsFromServer.length === 0 || collectionsFromServer.length < 12) {
      setPosts([...posts, ...collectionsFromServer]);
      setHasMore(false)
      // return
    } else {
      setPosts([...posts, ...collectionsFromServer]);
      setPage(page + 1);    
    }
  };
  useEffect(() => {
    const getFirstData = async () => {
      setPosts([]);
      setPage(2)
      setHasMore(true)
      const { data } = await axios(`api/collections/list?search[sortBy]=${category}&search[query]=&page=1`);
      if (data.data.last) {
        setHasMore(false)
      }
      setPosts(data.data.content);
    };
    getFirstData();
    return () => {
      setPosts([]);
    }
  }, [category])
  // useEffect(() => {        
  //   window.addEventListener("scroll", handleScroll)    
  //   return () => {
  //     setPosts([])
  //     window.removeEventListener('scroll', handleScroll)  
  //   }
  // }, [value])
  // const handleValue = (target) => {
  //   window.scroll({ top: 700 })
  //   window.scroll({ top: 701 })
  //   if (target === '가수') {
  //     setValue(0)
  //   } else if (target === '배우') {
  //     setValue(1)
  //   } else if (target === '셀럽') {
  //     setValue(2)
  //   } else if (target === '일반인') {
  //     setValue(3)
  //   }
  // }
  return (
    // <TabsUnstyled defaultValue={0} onChange={e => handleValue(e.currentTarget.innerHTML)}>
    //   <TabsList>
    //     <Tab tabIndex={0}>가수</Tab>
    //     <Tab tabIndex={1}>배우</Tab>
    //     <Tab tabIndex={2}>셀럽</Tab>
    //     <Tab tabIndex={3}>일반인</Tab>
    //   </TabsList>
    //   <TabPanel value={value}>
    //     <div style={{paddingBottom: '10vh'}}>
    //       <div className='bids'>
    //         <div className="bids-container">          
    //           {/* <MainTabs value={value} setValue={setValue} /> */}
    //           {/* <div className="bids-container-text">
    //             <h1>Hot</h1>
    //           </div> */}
    //           {isLoading ? <div className="bids-container-card"><Skeleton type="post" /></div>
    //             :
    //             <div className="bids-container-card">
    //               {posts.map((post, idx) => <Post key={idx} post={post} onItemClicked={onItemClicked} />)}
    //             </div>
    //           }
    //         </div>
    //       </div>
    //     </div>
    //   </TabPanel>
    // </TabsUnstyled>
    <div style={{paddingBottom: '10vh'}}>
      <div className='bids'>
        <div className="bids-container">
          <MainTabs
            // value={value}
            // setValue={setValue}
            category={category}
            setCategory={setCategory}
          />
          <div className="bids-container-card">
            <InfiniteScroll
              dataLength={posts?.length} //This is important field to render the next data
              next={fetchData}
              hasMore={hasMore}
              loader={
                <Skeleton type="post" />  
              }
              // endMessage={
              //   <div style={{color: 'white'}}>
              //     <b>Yay! You have seen it all</b>
              //   </div>
              // }
              >
                {posts?.map((post, idx) => <Post key={idx} post={post} onItemClicked={onItemClicked} />)}              
            </InfiniteScroll> 
          </div>
        </div>
      </div>
    </div>
  );
};
export default Posts;