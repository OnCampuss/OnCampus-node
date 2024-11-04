const db = require("../database");
const UserInfo = require("./userInfo");

class UserInfoRepository {
  constructor() {
    this.db = db;
  }

  async findAll() {
    const userInfoList = await this.db.manyOrNone(
      'SELECT cpf, matricula, semestre, contaativa, localizacao, user_id AS "userId" FROM UserInfo'
    );
    return userInfoList.map(userInfo => new UserInfo(userInfo));
  }

  async create(userInfo) {
    await this.db.none(
      "INSERT INTO UserInfo (cpf, matricula, semestre, contaativa, localizacao, user_id) VALUES (${cpf}, ${matricula}, ${semestre}, ${contaativa}, ${localizacao}, ${userId})",
      userInfo
    );
  }
}

module.exports = UserInfoRepository;
