const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo  de receta //
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    summary: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    steps: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
    },
    createdByUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{timestamps:false});
};
