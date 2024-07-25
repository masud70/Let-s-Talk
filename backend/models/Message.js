module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define("Message", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		messageBody: {
			type: DataTypes.STRING,
		},
	});

	return Message;
};
