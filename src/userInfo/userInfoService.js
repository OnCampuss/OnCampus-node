const UserInfo = require("./userInfo");

class UserInfoService {
  constructor(repository) {
    this.repository = repository;
  }

  async findAllUserInfoService() {
    return await this.repository.findAll();
  }

  async createUserInfo({ cpf, matricula, semestre, contaativa, localizacao, userId }) {
    const newUserInfo = new UserInfo({
      cpf,
      matricula,
      semestre,
      contaativa,
      localizacao,
      userId,
    });

    const allUserInfo = await this.repository.findAll();
    const existingUserInfo = allUserInfo.find(userInfo => userInfo.cpf === newUserInfo.cpf);

    if (existingUserInfo) {
      throw new Error("Um usuário com esse mesmo CPF já está criado!!");
    }

    await this.repository.create(newUserInfo);
    return newUserInfo;
  }
}

module.exports = UserInfoService;
