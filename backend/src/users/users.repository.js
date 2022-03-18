/**
 * contents table Manipulations
 * contents 테이블에 접근합니다.
 */
const connection = require("../../config/connection").promise();

class UsersRepository {
  async getCategories() {
    const sql = `
			SELECT 		user_category_id, user_category_name
			FROM    	users_category
		`;

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }
}

module.exports = UsersRepository;