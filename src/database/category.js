module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgurl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  Category.associate = (models) => {
    //DEFINES RELATIONSHIPS AND FOREIGN KEYS
    Category.hasMany(models.Article); //ONE-TO-MANY: CATEGORY IS ONE, ARTICLE IS MANY
  };
  return Category;
};
