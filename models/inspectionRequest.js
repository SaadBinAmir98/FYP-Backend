module.exports = (sequelize, DataTypes) => {
const InspectionRequest = sequelize.define('InspectionRequest', {
    inspectionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    homeAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });
  
  InspectionRequest.associate = (models) => {
    InspectionRequest.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    InspectionRequest.belongsTo(models.Products, {
      foreignKey: "productId",
      onDelete: "CASCADE",
    });
  };


  return InspectionRequest;
};