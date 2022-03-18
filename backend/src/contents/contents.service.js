/**
 * Services Logics related to Digital Assets(Content)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const ContentsRepository = require("./contents.repository");
const { getS3List, deleteS3Object } = require("../../config/s3-config");
const contentsRepository = new ContentsRepository();

class ContentsService {
  /**
   * PJT Ⅱ - 과제 1: Req.1-B1 작품 등록 (파일 업로드 포함)
   * 1. 이미지의 중복 여부를 판별합니다.
   * 2. 중복된 이미지가 없다면 정보를 DB에 추가합니다.
   * 3. 저장된 작품의 id를 responseBody에 추가하여 반환합니다.
   *
   */
  async createContents(req) {
    let data = req.body;
    let contentTitle = data["content_title"];
    let contentDescription = data["content_description"];
    let collection = data["collection"];
    let ownerAddress = data["owner_address"];
    let imgUrl = req.file.location;

    const result = await contentsRepository.createContents(
      contentTitle,
      contentDescription,
      collection,
      ownerAddress,
      imgUrl
    );
    const contentId = result.insertId;

    if (contentId) {
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
          data: [
            {
              content_id: contentId,
              img_url: req.file.location,
            },
          ],
        },
      };
    }
  }

  /**
   * PJT Ⅱ - 과제 1: Req.1-B2 작품 정보 업데이트
   */
  async updateContentTokenIdAndOwnerAddress(contentId, tokenId, ownerAddress) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
      },
    };
  }

  /**
   * PJT Ⅱ 과제 2:
   * Req.2-B1 작품 목록 조회
   * Req.2-B2 주소가 보유한 작품 목록 조회
   *
   * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
   * Req.4-B1 작품 목록 조회
   * Req.4-B2 주소가 보유한 작품 목록 조회
   */
  async getContents(address) {
    if (address) {
      // 전체 작품 목록 조회
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
          data: await contentsRepository.getContentsByOwnerAddress(address),
        },
      };
    } else {
      //주소가 보유한 작품 목록 조회
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
          data: await contentsRepository.getContents(),
        },
      };
    }
  }

  /*
   * PJT Ⅲ 과제 3:
   * Req.4-B3 최근 등록 작품 조회
   */
  async getRecentContents() {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: [],
      },
    };
  }

  /**
   * PJT Ⅱ 과제 2:
   * Req.2-B3 작품 상세 조회
   */
  async getContentsByTokenId(tokenId) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await contentsRepository.getContentByTokenId(tokenId),
      },
    };
  }

  async updateContentOwnerAddress(tokenId, ownerAddress) {
    if (await contentsRepository.updateContentOwnerAddress(tokenId, ownerAddress)) {
      return {
        statusCode: 200,
        responseBody: {
          result: "success",
        },
      };
    }
  }
}

module.exports = ContentsService;
