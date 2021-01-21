module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    //DEFINES Author AS A SEQUELIZE MODEL
    "author", //TABLE NAME
    {
      id: {
        type: DataTypes.INTEGER, //DEFINES THE TYPE OF DATA
        primaryKey: true, //SET THIS AS PRIMARY KEY
        autoIncrement: true, //MAKES ID INCREASE AUTOMATICALLY
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //MAKES THIS FIELD REQUIRED
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgurl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false } //REMOVES TIMESTAMPS. ON BY DEFAULT
  );
  return Author; //RETURNS MODEL TO INDEX.JS
};
