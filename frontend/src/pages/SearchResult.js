import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Page from "../components/Page";
import Post from "../components/post/Post";
import Posts from "../components/post/Posts";
import Skeleton from "../components/skeleton/skeleton";
import queryString from "query-string";
const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const query = queryString.parse(location.search)
  const onItemClicked = () => {
    alert('클릭!')
  }
  // const handleScroll = (e) => {     
  //   const scrollHeight = e.target.documentElement.scrollHeight;
  //   const currentHeight = Math.ceil(
  //   e.target.documentElement.scrollTop + window.innerHeight
  //   );
  //   if (currentHeight + 200 >= scrollHeight) {
  //     setIsLoading(true);
  //     getData('singer')
  //     // if (value === 0) {
  //     //     getData('singer')
  //     //   } else if (value === 1) {
  //     //     getData('actor');
  //     //   } else if (value === 2) {
  //     //     getData('celeb');
  //     //   } else if (value === 3) {
  //     //     getData('general');
  //     //   }     
  //   }
  // };
  const getData = async () => {
    const category = ['singer', 'actor', 'celeb', 'general'];
    let collectionsData = [];
    for (let i = 0; i < category.length; i++) {
      let currentPage = 1;
      console.log(category[i])
      const { data } = await axios(
        {
          method: "GET",
          url: `api/collections/list?search[sortBy]=${category[i]}&search[query]=${query.query}&page=${currentPage}`,
          headers: {}
        })
      console.log(data)
      if (currentPage === data.data.total_pages) {
        console.log('종료')
        collectionsData.concat(data.data.content)
        currentPage++;
        // setPosts(old => {        
        //   return [...old, ...data.data.content]
        // })
        // setIsLoading(false)        
      } else if (currentPage === data.data.total_pages + 1) {
        console.log('특수 케이스 종료')
      } else {
        // setPosts(oldData => [...oldData, ...data.data.content])
        // setIsLoading(false)
        collectionsData.concat(data.data.content)
        console.log('채우기')
        currentPage++;
      }
    }
    console.log(collectionsData)
    setPosts(collectionsData);
  }   

  useEffect(() => {
    getData()    
    return () => {
      setPosts([])      
    }
  }, [])
  return (
    // <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
    <Page title="FANLEB" sx={{}}>
      
      <h3 style={{color: 'white', margin: '10vh 20vh'}}>items</h3>
      <div style={{paddingBottom: '10vh'}}>
        <div className='bids'>
          <div className="bids-container">          
            {/* <div className="bids-container-text">
              <h1>Hot</h1>
            </div> */}
            {isLoading ? <div className="bids-container-card"><Skeleton type="post" /></div>
              :
              <div className="bids-container-card">
                {posts.map((post, idx) => <Post key={idx} post={post} onItemClicked={onItemClicked} />)}
              </div>
            }
          </div>
        </div>
      </div>     
    </Page>
  );
};

export default SearchResult;
