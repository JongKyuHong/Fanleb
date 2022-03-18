/**
 * Services Logics related to Sale
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const UsersRepository = require("./users.repository");
const usersRepository = new UsersRepository();

class UsersService {
  /**
   * PJT Ⅲ 과제 2:
   * Req.2-B1 판매 정보 등록
   */
  async getCategories() {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await usersRepository.getCategories(),
      },
    };
  }
}

module.exports = UsersService;
