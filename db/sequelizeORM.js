const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (other dialects)
const sequelizeORM = new Sequelize('app', process.env.POSGRESQL_USER, process.env.POSGRESQL_PASS, {
  host: process.env.POSGRESQL_URL,
  dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    freezeTableName: true // model name matches table name
  }
});

sequelizeORM.authenticate()
.then(() => {
    console.log('Connection to postgreSQL database established successfully');
}).catch((err) => {
    console.log(err);
})

module.exports = sequelizeORM

/*
Difference between HasOne and BelongsTo



class Player extends Model {}
Player.init({ attributes }, { sequelize, modelName: 'player' })
class Team extends Model {}
Team.init({ attributes }, { sequelize, modelName: 'team' });
When we link two models in Sequelize we can refer them as pairs of source and target models. Like this

Having Player as the source and Team as the target

Player.belongsTo(Team);
//Or
Player.hasOne(Team);
Having Team as the source and Player as the target

Team.belongsTo(Player);
//Or
Team.hasOne(Player);
HasOne and BelongsTo insert the association key in different models from each other. HasOne inserts the association key in target model whereas BelongsTo inserts the association key in the source model.

Here is an example demonstrating use cases of BelongsTo and HasOne.

class Player extends Model {}
Player.init({ attributes }, { sequelize, modelName: 'player' })
class Coach extends Model {}
Coach.init({ attributes }, { sequelize, modelName: 'coach' })
class Team extends Model {}
Team.init({ attributes }, { sequelize, modelName: 'team' });
Suppose our Player model has information about its team as teamId column. Information about each Team's Coach is stored in the Team model as coachId column. These both scenarios requires different kind of 1:1 relation because foreign key relation is present on different models each time.

When information about association is present in source model we can use belongsTo. In this case Player is suitable for belongsTo because it has teamId column.

Player.belongsTo(Team)  // `teamId` will be added on Player / Source model
When information about association is present in target model we can use hasOne. In this case Coach is suitable for hasOne because Team model store information about its Coach as coachId field.

Coach.hasOne(Team)  // `coachId` will be added on Team / Target model

*/