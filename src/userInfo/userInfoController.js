class UserInfoController {
  constructor(service) {
    this.service = service;
  }

  async index(request, reply) {
    const userInfo = await this.service.findAllUserInfoService();
    return reply.status(200).send({ userInfo });
  }

  async save(request, reply) {
    const { cpf, matricula, semestre, contaativa, localizacao } = request.body;
    const user = request.user;

    if (!cpf) {
      return reply.status(400).send({ message: "A informação do usuário não pode ser criada sem um CPF!!!" });
    }

    try {
      const userInfo = await this.service.createUserInfo({
        cpf,
        matricula,
        semestre,
        contaativa,
        localizacao,
        userId: user.id,
      });

      return reply.status(200).send({
        message: "Informações adicionadas com sucesso",
        userInfo,
      });
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  }
}

module.exports = UserInfoController;
