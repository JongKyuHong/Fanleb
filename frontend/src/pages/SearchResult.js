import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Page from "../components/Page";
import Post from "../components/post/Post";
import Posts from "../components/post/Posts";
import Skeleton from "../components/skeleton/skeleton";
import queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";
const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const query = queryString.parse(location.search)
  const [totalCount, setTotalCount] = useState(0);
  const onItemClicked = () => {
    alert('클릭!')
  }

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const fetchCollections = async () => {
    try {
      const res = await axios(
        `api/collections/list?search[sortBy]=&search[query]=&page=${page}`
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
      const { data } = await axios(`api/collections/list?search[sortBy]=&search[query]=${query.query}&page=1`);
      if (data.data.last) {
        setHasMore(false)
      }
      console.log(data)
      setTotalCount(data.data.total_elements)
      setPosts(data.data.content);
    };
    getFirstData();
    return () => {
      setPosts([]);
    }
  }, [])
  return (
    // <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
    <Page title="FANLEB" sx={{}}>
      <div style={{marginTop: '20vh', marginLeft: '10vw', marginBottom: '3vw'}}>
        <h2 style={{ color: 'white' }}>{ totalCount } Items</h2>
      </div>
      <div style={{paddingBottom: '10vh'}}>
        <div className='bids'>
          <div className="bids-container">
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
    </Page>
  );
};

export default SearchResult;
