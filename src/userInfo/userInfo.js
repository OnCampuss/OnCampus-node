class UserInfo {
  constructor({ cpf, matricula, semestre, contaativa, localizacao, userId }) {
    this.cpf = cpf;
    this.matricula = matricula;
    this.semestre = semestre;
    this.contaativa = contaativa ?? true;
    this.localizacao = localizacao;
    this.userId = userId;
  }
}
module.exports = UserInfo;
