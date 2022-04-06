import { Avatar, Paper, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import './bids.css';
import { display, height, width } from "@mui/system";
import axios from "axios";
import UserImg from "./userImage";
import empty from "./empty-image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateThumnail } from "../../redux/modalSlice";
// import CollectionImg from "./CollectionImg";
const Post = (props) => {
  const { post: { nickname, collection_name, img_url, user_address, id }, onItemClicked } = props;
  const [avatarImg, setAvatarImg] = useState("");
  const [elevation, setElevation] = useState(0);
  const [load, setLoad] = useState(false);
  const [userCategory, setUsercategory] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(false);
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const selectPost = () => {
    // onItemClicked();    
    if (userInfo.userAddress === "" || userInfo.userAddress.length <= 0) {
      alert(`Metamask 지갑을 연동해주세요.`)
    } else {
      getData()
    }
  };
  const getData = async () => {
    const thumnailData = {
      nickname: nickname,
      category: userCategory.user_category_name,
      userAddress: user_address,
      userImgUrl: avatarImg,
      description: description,
      imgUrl: img_url,
      collectionName: collection_name,
      contentsData: []
    }
    const { data } = await axios(`api/contents/thumbnail?user_address=${user_address}`);
    thumnailData.contentsData = [...data.data];
    console.log(thumnailData)

    dispatch(updateThumnail(thumnailData))
  } 
  const encodeUrl = () => {
    if (img_url.includes('mp4')) {
      setVideo(true)
    } else {
      setVideo(false)
    }
  }
  useEffect(() => {
    // encodeUrl()
    axios
      .get(`api/users/address?user_address=${user_address}`)
      .then((res) => {
        setAvatarImg(res.data.data.img_url)
        setUsercategory(res.data.data.users_category)
        setDescription(res.data.data.user_description)
      })
    return () => {
      setAvatarImg("")
    }
  }, [])
  return (
    // <Container
    //   onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
    //   onMouseLeave={() => set({xys:[0,0,1]})}
    //   style={{transform: rops.xys.interpolate(trans)}}
    // >
      <div className="card-column" onClick={selectPost} elevation={elevation} style={{ cursor: 'pointer'}} >
        <div className="bids-card">
        <div className="bids-card-top" style={{
          // position: 'relative',
          // // paddingBottom: '3.75rem',
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center'
        }}>
          {/* {video ?
            <video preload="none" loop="1">
              <source src={img_url} type="video/mp4" />
            </video>
            :
            <img
              className="profile-image"
              src={img_url ? img_url : empty}
              alt=""            
            />
          }           */}
          <img
              className="profile-image"
              src={img_url ? img_url : empty}
              alt=""            
            />
          {/* <CollectionImg title={collection_name}  imgUrl={img_url} empty={empty} />        */}
          <div
            className="avatar-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // width: '200px',
              marginTop: '-100px',
            }}
          >            
            <UserImg avatarImg={avatarImg} />            
          </div>
          {/* <img src="https://static.remove.bg/remove-bg-web/b27c50a4d669fdc13528397ba4bc5bd61725e4cc/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
            style={{ border: '6px solid var(--color-bg)',
            borderRadius: '50%',
           width: '70%', height: '10%' }} alt="profile" />             */}
          
          {/* <Link to={`/post/123`}> */}
          <p className="bids-title" style={{textAlign: 'center'}}>{collection_name? collection_name : 'null'}</p>
          {/* </Link> */}
          <p style={{ marginLeft: 'auto', fontSize: '15px', color: 'rgb(32, 129, 226)', textAlign: 'center' }}><span style={{ color: 'rgb(112, 122, 131)' }}>by </span>{nickname}</p>          
        </div>
        <div className="bids-card-bottom">
            {/* <p>{nickname} <span>{ user_address }</span></p> */}
            {/* <p> <AiFillHeart /> 92</p> */}
          </div>
        </div>
      </div>
    // </Container>
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