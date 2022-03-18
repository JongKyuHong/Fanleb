/**
 * contents table Manipulations
 * contents 테이블에 접근합니다.
 */
const connection = require("../../config/connection").promise();

class ContentsRepository {
  async createContents(contentTitle, contentDescription, collection, ownerAddress, imgUrl) {
    const sql = `
			INSERT INTO    contents(content_title,
						content_description,
						collection,
						owner_address,
						img_url)
			VALUES    (?, ?, ?, ?, ?)
		`;

    return await connection
      .query(sql, [contentTitle, contentDescription, collection, ownerAddress, imgUrl])
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getContents() {
    const sql = `
			SELECT 		author_name,
						content_description,
						content_title,
						on_sale_yn,
						owner_address,
						token_id,
						date_format(created_at, '%Y-%m-%d %H:%i:%s') as contents_create_at
			FROM    	contents
			ORDER BY    created_at DESC
		`;
    // console.debug(sql);

    return await connection
      .query(sql)
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getContentsByOwnerAddress(address) {
    const sql = `
			SELECT 		author_name,
						content_description,
						content_title,
						on_sale_yn,
						owner_address,
						token_id,
            date_format(created_at, '%Y-%m-%d %H:%i:%s') as contents_create_at
			FROM    	contents
			WHERE owner_address=?
			ORDER BY    created_at DESC
		`;

    return await connection
      .query(sql, [address])
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async getRecentRegisteredContent() {
    return null;
  }

  async getRecentContentsOnSale() {
    return null;
  }

  async getContentByTokenId(tokenId) {
    const sql = `
			SELECT 		author_name,
						content_description,
						content_title,
						on_sale_yn,
						owner_address,
						token_id,
            date_format(created_at, '%Y-%m-%d %H:%i:%s') as contents_create_at
			FROM    	contents
			WHERE token_id=?
			ORDER BY    created_at DESC
		`;

    return await connection
      .query(sql, [tokenId])
      .then((data) => data[0])
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }

  async updateContentOwnerAddress(tokenId, ownerAddress) {
    return null;
  }

  async updateContentTokenIdAndOwnerAddress(contentId, tokenId, ownerAddress) {
    return null;
  }

  async validateContentDuplicated(hashCode) {
    return null;
  }
}

module.exports = ContentsRepository;
