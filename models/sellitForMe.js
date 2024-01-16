module.exports = (sequelize, DataTypes) => {
    const SellitForMe = sequelize.define("SellitForMe", {
      SellitForMeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inspectionSlot: {
        type: DataTypes.ENUM('Coming Monday', 'Coming Tuesday', 'Coming Wednesday', 'Coming Thursday', 'Coming Friday', 'Coming Saturday', 'Coming Sunday'),
        allowNull: false,
      },
      inspectionTime: {
        type: DataTypes.ENUM('10:00 AM', '12:00 AM', '02:00 AM', '04:00 AM', '06:00 AM'),
        allowNull: false,
      },
    });
  
    return SellitForMe;
  };
  