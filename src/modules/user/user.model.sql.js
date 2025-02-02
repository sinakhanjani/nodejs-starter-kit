// Importing required modules and dependencies
const sequelizeORM = require('../../../db/sequelizeORM')
// Importing required modules and dependencies
const { Sequelize } = require('sequelize');

//VALIDATION MODEL:
//https://sequelize.org/master/manual/validations-and-constraints.html

//Advanced M:N Associations "Super Many-to-Many association"
//https://sequelize.org/master/manual/advanced-many-to-many.html
// Importing required modules and dependencies
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
// Function definition
    beforeValidate: () => {
      //
    },
// Function definition
    afterValidate: () => {
      //
    },
// Function definition
    beforecreate: () => {
      //
    },
// Function definition
    afterCreate: () => {
      //
    }
  }
})
.sync({
  logging: console.log,
  force: true // Drop table every changed - must beremoved after test.
})
// Function definition
.then(() => {
  // CRUD anythings
  // MARK: - Create:
  // User.create(
  //   {
  //     name: 'sina',
  //     phone: '09125933044'
  //   }
// Function definition
  // ).then((user) => {

  // })
  // MARK: Add multi users from json to database in one.
// Function definition
  // User.bulkCreate(_USERS).then((users) => {
  //   //
  // })
})

//VALIDATION MODEL:
//https://sequelize.org/master/manual/validations-and-constraints.html

//Advanced M:N Associations "Super Many-to-Many association"
//https://sequelize.org/master/manual/advanced-many-to-many.html
