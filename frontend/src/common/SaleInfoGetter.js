import axios from 'axios';
import header from './HeaderType';

/* 
NFT별 Sale 컨트랙트 주소 확인을 위해 다음과 같이 공통 호출 함수를 선언할 수 있습니다.
- 판매 정보 조회 API를 호출해서 DB에 저장된 값을 반환 받습니다.
- 인자 id는 tokenID 정보를 받고, 결과에는 Sales 데이터가 출력됩니다.
- Sales 데이터에서 반환되는 정보 중 sale_contract_address를 사용합니다.
*/
export default async function getByTokenId(id) {
  var config = {
    method: 'get',
    url: `/api/sales?token_id=${id}`, // http://j6a107.p.ssafy.io/
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return [response.data.data.sale_contract_address,response.data.data.price];
  })
  .catch(function (error) {
    console.log(error);
  });
}
