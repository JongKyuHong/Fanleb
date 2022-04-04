import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Skeleton({ type }) {
  const COUNTER = 12;
  const PostSkeleton = () => (
    <div className="card-column">
      <div className="bids-card">
        <div className="bids-card-top">
          <div className='profile-image' src="" alt="" />
          <div className='avatar-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // width: '200px',
              // marginTop: '-100px',              
            }}>
            
            </div>
          <p className="bids-title" style={{ visibility: 'hidden'}}>dd</p>
          <p style={{visibility: 'hidden', marginLeft: 'auto', fontSize: '15px', color: 'rgb(32, 129, 226)', textAlign: 'center'}}><span style={{color: 'rgb(112, 122, 131)'}}>by </span>dd</p>
        </div>
        <div className="bids-card-bottom">            
        </div>
      </div>
    </div>
  );
  if (type === 'post') return (
    <>
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
      <PostSkeleton key={uuidv4()} />
    </>
  );
}

