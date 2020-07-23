const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Usuario ya registrado'
    },
    validate: {
      isEmail: {
        msg: 'Agrega un correo valido'
      }
    }
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El password no debe estar vacio'
      }
    }
  },
  token: Sequelize.STRING,
  expiration: Sequelize.DATE
}, {
  hooks: {
    beforeCreate(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    }
  }
});

User.prototype.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = User;