import { useEffect, useState } from 'react';
import Post from './Post';
import MainTabs from '../MainTabs/MainTabs';
import './bids.css'
import bids1 from '../../images/bids1.png'
import { getMyCollections } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const onItemClicked = () => {
    alert('클릭!')
  };
  
  function getUsers(value) {
    if (value == 1) {      
      setPosts(() => [
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 150
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 140
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 400
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 300
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 200
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 10
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 130
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 12
        },
      ]);
    } else if (value == 2) {
      setPosts(() => [
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 130
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 12
        },
      ])
    } else {
      setPosts(() => [
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 400
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 300
        },
        {
          username: 'testUser',
          caption: '테스트 내용입니다.',
          imageUrl: bids1,
          scribeCounts: 200
        },
      ])
    }

    }
  const getData = async (category) => {
    const { data } = await axios(
      {
        method: "GET",
        url: `api/collections/list?search[sortBy]=${category}&search[query]=`,      
        headers: {}
      })
    console.log(data.data)
    setPosts(data.data.content)
  }
  useEffect(() => {    
    // if (value === 0) {
    //   getMyCollections(dispatch, 'singer');
    // } else if (value === 1) {
    //   getMyCollections(dispatch, 'actor');
    // } else if (value === 2) {
    //   getMyCollections(dispatch, 'celeb');
    // } else if (value === 3) {
    //   getMyCollections(dispatch, 'general');      
    // }
    if (value === 0) {
      getData('singer')
    } else if (value === 1) {
      getData('actor');
    } else if (value === 2) {
      getData('celeb');
    } else if (value === 3) {
      getData('general');
    }
    
    return () => {

    }
  }, [value])

  return (
    <div style={{paddingBottom: '10vh'}}>
      <div className='bids'>
        <div className="bids-container">          
          <MainTabs value={value} setValue={setValue} />
          <div className="bids-container-text">
            <h1>Hot</h1>
          </div>
          <div className="bids-container-card">            
            {posts.map((post, idx) => <Post key={idx} post={post} onItemClicked={onItemClicked} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Posts;