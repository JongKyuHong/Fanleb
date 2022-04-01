import { Avatar, Paper } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import './bids.css';

const Post = (props) => {
  const { post: {nickname, collection_name, img_url, user_address, id}, onItemClicked } = props;
  const [elevation, setElevation] = useState(0);
  const selectPost = () => {
    onItemClicked();
  };

  return (
    
    <div className="card-column" onClick={selectPost} elevation={elevation} onMouseOver={() => setElevation(20)} onMouseOut={() => setElevation(0)} sx={{ cursor: 'pointer'}} >
      <div className="bids-card">
        <div className="bids-card-top">
          <img src={img_url} alt="" />
        <Link to={`/post/123`}>
          <p className="bids-title">{ collection_name}</p>
        </Link>
        </div>
        <div className="bids-card-bottom">
          <p>{nickname} <span>{ user_address }</span></p>
          {/* <p> <AiFillHeart /> 92</p> */}
        </div>
      </div>
    </div>
    
    // <Paper className="post" onClick={selectPost} elevation={elevation} onMouseOver={() => setElevation(10)} onMouseOut={() => setElevation(0)}>
    //   <div className="post__header">
    //     <Avatar
    //       className="post__avatar"
    //       alt=""
    //     />
    //     <h3>{username}</h3>
    //   </div>

    //   <img src={imageUrl} alt={`img`}/>
    //   <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
    // </Paper>
  );
};
export default Post;