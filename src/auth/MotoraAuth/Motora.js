const { v4: uuidV4 } = require("uuid");

class Motora {
  constructor({ id, name, email, password
  }) {
    this.id = id ?? uuidV4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

module.exports = Motora;
