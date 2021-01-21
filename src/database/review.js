module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_clapped: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.Article); //ONE-TO-MANY: REVIEW IS MANY, ARTICLE IS ONE
    Review.belongsTo(models.Author); //ONE-TO-MANY: REVIEW IS MANY, AUTHOR IS ONE
  };
  return Review;
};
