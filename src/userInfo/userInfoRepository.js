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

  async update(userInfo) {
    await this.db.none(
      "UPDATE UserInfo SET matricula=${matricula}, semestre=${semestre}, contaativa=${contaativa}, localizacao=${localizacao} WHERE cpf=${cpf} AND user_id=${userId}",
      userInfo
    );
  }
}

module.exports = UserInfoRepository;
