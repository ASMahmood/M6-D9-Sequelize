module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subhead: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(100000),
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  Article.associate = (models) => {
    //DEFINES RELATIONSHIPS AND FOREIGN KEYS
    Article.belongsTo(models.Category); //ONE-TO-MANY: ARTICLE IS MANY, CATEGORY IS ONE
    Article.belongsTo(models.Author); //ONE-TO-MANY: ARTICLE IS MANY, AUTHOR IS ONE
    Article.hasMany(models.Review); //ONE-TO-MANY: ARTICLE IS ONE, REVIEW IS MANY
  };
  return Article;
};
