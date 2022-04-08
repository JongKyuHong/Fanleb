import React from 'react'
import { useSelector } from 'react-redux';
import './Loading.css';
function Loading() {
  const { isLoading } = useSelector(state => state.modal);
  console.log('로딩 스피너', isLoading)
  return (
    <h2 className="animate" style={!isLoading ? { display: 'none' } : {}}>
      <div className='loading'>Loading</div>
    </h2>
  )
}

export default Loading