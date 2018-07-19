module.exports = function (sequelize, Sequelize) {
    var Factories = sequelize.define("Factories", {
        facName: {
            type: Sequelize.STRING,
            notEmpty: true
          },
          numChildren: {
            type: Sequelize.INTEGER,
            notEmpty: true
          },
          lowLim: {
            type: Sequelize.INTEGER,
            notEmpty: true
          },
          upLim: {
            type: Sequelize.INTEGER,
            notEmpty: true
          },
         
    })

    Factories.associate = function (models) {

        Factories.hasMany(models.Children, {
            onDelete: "cascade"
        });
    };

    return Factories;
}