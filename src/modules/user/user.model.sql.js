const sequelizeORM = require('../../../db/sequelizeORM')
const { Sequelize } = require('sequelize');

//VALIDATION MODEL:
//https://sequelize.org/master/manual/validations-and-constraints.html

//Advanced M:N Associations "Super Many-to-Many association"
//https://sequelize.org/master/manual/advanced-many-to-many.html
const User = sequelizeORM.define('User', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        max: 11,
        min: 11,
        contains: {
          args:['09'],
          msg: 'phone must contain 09 at first'
        }
      }
    },
    name: {
      type: Sequelize.STRING,
      defaultValue: '',
    }
},{
  timestamps: true,
  hooks: {
    beforeValidate: () => {
      //
    },
    afterValidate: () => {
      //
    },
    beforecreate: () => {
      //
    },
    afterCreate: () => {
      //
    }
  }
})
.sync({
  logging: console.log,
  force: true // Drop table every changed - must beremoved after test.
})
.then(() => {
  // CRUD anythings
  // MARK: - Create:
  // User.create(
  //   {
  //     name: 'sina',
  //     phone: '09125933044'
  //   }
  // ).then((user) => {

  // })
  // MARK: Add multi users from json to database in one.
  // User.bulkCreate(_USERS).then((users) => {
  //   //
  // })
})

//VALIDATION MODEL:
//https://sequelize.org/master/manual/validations-and-constraints.html

//Advanced M:N Associations "Super Many-to-Many association"
//https://sequelize.org/master/manual/advanced-many-to-many.html