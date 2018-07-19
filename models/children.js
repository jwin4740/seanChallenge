module.exports = function (sequelize, Sequelize) {
    var Children = sequelize.define("Children", {
  
        numValue: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
     
    });
    Children.associate = function (models) {
      
      Children.belongsTo(models.Factories, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Children;
  
  }
  