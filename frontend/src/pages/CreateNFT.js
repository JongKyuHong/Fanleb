import './index.css';
import Image from '../images/Image.png';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { Dropzone, FileItem, VideoPreview } from "@dropzone-ui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {  Checkbox, FormControlLabel, Modal } from '@mui/material';
import { getMyCollections } from '../redux/apiCalls';
import { LoadingButton } from '@mui/lab';
import AsyncSelect from 'react-select/async';
import { registerNFTtoBackend } from '../utils/NFT';

const CreateNFT = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [myCollection, setMyCollection] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState("");
  const [selectIpfs, setSelctIpfs] = useState(false);
  const address = useSelector(state => state.user.userInfo.userAddress);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [files, setFiles] = useState([]);
  const [videoSrc, setVideoSrc] = useState(undefined);

  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
    setFile(incommingFiles[0].file)
  };

  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleWatch = (vidSrc) => {
    console.log("handleWatch", vidSrc);
    setVideoSrc(vidSrc);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     description: "",
  //     image: files,
  //   },
  //   onSubmit: (values) => {
  //     console.log(values)
  //   }
  // })

  const addCollection = () => {
    if (newCollection.trim().length > 0) {
      const newData = {      
        'collection_name': newCollection,
        'id': collections.length     
      }
      axios.post(`api/collections`, { "user_address": address, "collection": newCollection })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      setCollections((prev) => [newData, ...prev])
      alert('새로운 컬렉션을 만들었습니다.')
      setNewCollection("")
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() == "") {
      alert('제목을 입력해주세요.')
      return
    }
    if (file == undefined || file == null || file == '') {
      alert('파일을 등록해주세요.')
      return
    }
    if (description.trim() == "") {
      alert('내용을 입력해주세요.')
      return
    }
    if (myCollection.length <= 0) {
      alert('컬렉션을 입력해주세요.')
      return
    }
    const newData = {
      title,
      description,
      myCollection,
      file
    }
    let contentId;
    let img_url;
    
    if (selectIpfs) {
      // IPFS에 컨텐츠 기본 정보 등록

    } 
    // 백엔드에 컨텐츠 기본 정보 등록
    const formData = new FormData();
    formData.append('image', newData.file);
    formData.append('content_title', newData.title);
    formData.append('content_description', newData.description);
    try {
      const res = await axios({
        method: "POST",
        url: "api/contents",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      contentId = res.data.data.id;
      img_url = res.data.data.img_url;
  
      console.log('백엔드 등록 정보:', contentId, img_url)
      // 블록체인에 컨텐츠 등록
      try {
        const token_id = await registerNFTtoBackend(address, img_url);
        // console.log('블록체인에 등록한 TokenId:', token_id)
        // console.log('서버에 등록할 정보:', token_id, address, newData.myCollection.collection_name)
        const { data } = await axios({
          method: 'POST',
          url: `api/contents/${contentId}`,
          data: {
            "token_id": token_id,
            "owner_address": address,
            "collection": newData.myCollection.collection_name
          },
          headers: {}
        })
        if (data.result === "success") {
          alert('게시물이 정상적으로 등록되었습니다.')
        } else {
          alert('게시물 작성을 실패했습니다.')
        }
      } catch (err) {
        console.log('블록체인 등록 에러')
      }

    } catch (err) {
      console.log(err, '에러')
    }
    
  }
//   const filterColors = (inputValue) => {
//   return collections.filter((i) =>
//     i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );
// };
//   const promiseOptions = (inputValue) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(filterColors(inputValue));
//     }, 1000);
//   });
  useEffect(() => {
    axios(`/api/collections?page=1&user_address=${address}`)
      .then(res => {
        setCollections(res.data.data.content)
        setMyCollection(res.data.data.content[0])
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <Page title="FANLEB" sx={{}}>
        <div className='create section__padding'>
          <div className="create-container">
            <h1>NFT 발행하기</h1>
            <p className='upload-file'>파일 업로드
            </p>
            <>
              <Dropzone
                style={{ minWidth: "100%", background: '#2D2E36', border: 'none', borderRadius: '15px' }}
                onChange={updateFiles}
                minHeight="379px"
                onClean
                label={<>
                  <div className="upload-img-show">
                    <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 28GB.</h3>
                    <img src={Image} alt="banner" />
                    <p>마우스로 파일을 끌어서 놓으세요.</p>
                  </div>
                </>}
                id="file"
                name="file"
                value={files}
                maxFiles={1}
                maxFileSize={29980000000}
                accept="video/*, image/*"
                url="http://ec2-99-99-9-9.compute-1.amazonaws.com:2800/upload-my-file"
                //of course this url doens´t work, is only to make upload button visible
                fakeUploading
                disableScroll
                header={false}
                footer={false}
              >
              
              {files &&              
                files.map((file, idx) =>               
                <FileItem
                {...file}
                key={idx}
                onDelete={onDelete}
                onWatch={handleWatch}
                preview
                info
                alwaysActive
                resultOnTooltip
                />              
                )}
              </Dropzone>
              <VideoPreview
                videoSrc={videoSrc}
                openVideo={videoSrc}
                onClose={(e) => handleWatch(undefined)}
                controls
                autoplay
              />
            </>            
            <FormControlLabel control={<Checkbox defaultChecked value={selectIpfs} onChange={() => setSelctIpfs(!selectIpfs)} />} label={<span className="stop-dragging">IPFS에 저장하기</span>} />
              
            
            <form className='writeForm' autoComplete='off' onSubmit={onSubmit}>          
              <div className="formGroup">
                <label>제목</label>
                <input
                  id="title"
                  name='title'
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder='제목'
                  autoFocus={true}
                />
              </div>
              <div className="formGroup">
                {collections && collections.map(collection => {
                  <option>1</option>
                })}
                <label>설명</label>
                <textarea
                  id='description'
                  name='description'
                  type="text"
                  rows={4}
                  placeholder='아이템에 대한 설명을 작성하세요' 
                  value={description}  
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="formGroup" >
                <label>내 컬렉션</label>
                <div style={{display: 'flex'}} className="select-box">                  
                  <select style={{ flexGrow: 1 }} value={myCollection} onChange={e => setMyCollection(e.target.value)} id="collection" name='collection'>
                    {collections.map((collection, idx) => {
                      return <option key={idx} value={collection.collection_name}>{collection.collection_name}</option>
                    })}                    
                  </select>
                  <button type='button' className='create-collection-btn'
                    style={{
                    background: "transparent",
                    border: "1px solid var(--primary-color)",
                    margin: "0 1rem",
                    color: "var(--primary-color)",
                    borderRadius: "10px",
                    fontFamily: 'var(--font-family)',
                    fontWeight: "500",
                    width: 'auto'
                    }}
                    onClick={() => setModalOpen(true)}
                  ><span style={{fontSize: '20px'}}>+</span></button>
                </div>
                <Modal open={modalOpen} className="modal-container">
                  <div className="login-container">
                    <h1 style={{color: 'white', marginTop: 30}}>컬렉션 만들기</h1>
                    <div className='login-writeForm' autoComplete='off'>
                      <div className="login-formGroup">
                        {/* <label>Collection</label> */}
                        <input type="text" placeholder='Add Collection' value={newCollection} onChange={e => setNewCollection(e.target.value)} />
                      </div>
                      
                      <div className="login-button">
                        <button className='login-writeButton' onClick={addCollection}>추가</button>   
                        <button className='login-reg-writeButton' onClick={() => setModalOpen(false)}>취소</button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>            
            <button className='writeButton'>아이템 등록하기</button>
          </form>        
        </div>
      </div>
    </Page>
  </>
  )
};

export default CreateNFT;