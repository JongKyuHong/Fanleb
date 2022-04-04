import axios from "axios";

export default async function getMyCollections (address) {
  let currentPage = 1;
  let collectionList = [];
  // console.log('콜렉션 조회')
  while (true) {
    const { data } = await axios(`api/collections?page=${currentPage}&user_address=${address}`);
    // console.log(data.data.content)
    collectionList.push(...data.data.content)
    // console.log('채울 것', collectionList)
    if (data.data.last) break    
    currentPage++;
  }
  // console.log(collectionList, currentPage)
  return collectionList;
};