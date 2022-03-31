import './index.css';
import Image from '../images/Image.png';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { Dropzone, FileItem, VideoPreview } from "@dropzone-ui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Modal } from '@mui/material';
const CreateNFT = () => {
  const [collections, setCollection] = useState([]);
  const address = useSelector(state => state.user.userInfo.userAddress);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [files, setFiles] = useState([]);
  const [videoSrc, setVideoSrc] = useState(undefined);

  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };

  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleWatch = (vidSrc) => {
    console.log("handleWatch", vidSrc);
    setVideoSrc(vidSrc);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: files ? files[0] : "",
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const getCollections = async () => {
    const { data } = await axios(`api/collections?page=1`, { user_address: address })
    console.log(data)
  }
  
  useEffect(() => {
    getCollections()
  }, [collections])
  return (
    <>
    // <Page title="FANLEB" sx={{}}>
      <div className='create section__padding'>
        <div className="create-container">
          <h1>NFT 발행하기</h1>
          <p className='upload-file'>파일 업로드</p>
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
          
          <form className='writeForm' autoComplete='off' onSubmit={formik.handleSubmit}>          
            <div className="formGroup">
              <label>이름</label>
              <input
                id="title"
                name='title'
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder='아이템 이름'
                autoFocus={true}
              />
            </div>
            <div className="formGroup">
              <label>설명</label>
              <textarea
                id='description'
                name='description'
                type="text"
                rows={4}
                placeholder='아이템에 대한 설명을 작성하세요' 
                value={formik.values.description}  
                onChange={formik.handleChange}
              ></textarea>
            </div>
            
            <div className="formGroup" >
              <label>내 컬렉션</label>
              <div style={{display: 'flex'}}>

                <select style={{ flexGrow: 1 }} value={formik.values.collection} onChange={formik.handleChange} id="collection" name='collection'>
                  {/* {collections && collections.map((collection, idx) => {
                    <option value={collection} key={idx}>{ collection }</option>
                  })} */}
                  <option>Art</option>
                  <option>Photography</option>
                  <option>Sports</option>
                  <option>Collectibles</option>
                  <option>Trading Cards</option>
                  <option>Utility</option>
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
                >컬렉션 추가</button>
              </div>
            </div>            
          <button className='writeButton'>아이템 등록하기</button>
        </form>        
        </div>
    </div>

    // </Page></>
  )
};

export default CreateNFT;