import './index.css';
import Image from '../images/Image.png';
import { useEffect } from 'react';
import Page from '../components/Page';
const CreateNFT = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Page title="FANLEB" sx={{}}>
      <div className='create section__padding'>
        <div className="create-container">
          <h1>NFT 발행하기</h1>
          <p className='upload-file'>이미지 업로드</p>
          <div className="upload-img-show">
              <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
              <img src={Image} alt="banner" />
              <p>마우스로 파일을 끌어서 놓으세요.</p>
          </div>
          <form className='writeForm' autoComplete='off'>
            
            <div className="formGroup">
              <label>업로드</label>
              <input type="file" className='custom-file-input'
            />
            </div>
            <div className="formGroup">
              <label>이름</label>
              <input type="text" placeholder='아이템 이름' autoFocus={true} />
            </div>
            <div className="formGroup">
              <label>설명</label>
              <textarea type="text" rows={4}
            placeholder='아이템에 대한 설명을 작성하세요' 
            ></textarea>
            </div>
            <div className="formGroup">
              <label>가격</label>
              <div className="twoForm">
                <input type="text" placeholder='가격'  />
                <select>
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                  <option value="LTC">LTC</option>
                </select>
              </div>
            </div>
            <div className="formGroup">
              <label>카테고리</label>
              <select >
                <option>Art</option>
                <option>Photography</option>
                <option>Sports</option>
                <option>Collectibles</option>
                <option>Trading Cards</option>
                <option>Utility</option>
              </select>
            </div>
            {/* <div className="formGroup">
              <label>Available Items</label>
              <input type="text" placeholder='No of Items'/>
            </div> */}
            <button className='writeButton'>아이템 등록하기</button>
          </form>
        </div>
      </div>
    </Page>
  )
};

export default CreateNFT;