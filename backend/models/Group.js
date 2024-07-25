module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define("Group", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		groupName: {
			type: DataTypes.TEXT,
		},
		privacy: {
			type: DataTypes.TEXT,
			defaultValue: "public",
		},
	});

	return Group;
};
