module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		fullname: {
			type: DataTypes.TEXT,
		},
		username: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});

	return User;
};