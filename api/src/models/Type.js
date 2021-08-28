const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
 // defino el modelo
 sequelize.define("type-pokemon", {
  id: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   allowNull: false,
   primaryKey: true,
  },
  name: {
   type: DataTypes.STRING,
   allowNull: false,
  },
 });
};
