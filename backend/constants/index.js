const Roles = {
	SYSTEM_ADMIN: "system_admin",
	STS_MANAGER: "sts_manager",
	LANDFILL_MANAGER: "landfill_manager",
	UNASSIGNED: "unassigned",
};

const VehicleType = {
	OPEN: "Open Truck",
	DUMP: "Dump Truck",
	COMPACTOR: "Compactor",
	CONTAINER_CARRIER: "Container Carrier",
};

const Capacity = {
	THREE: 3,
	FIVE: 5,
	SEVEN: 7,
	FIFTEEN: 15,
};

module.exports = { Roles, VehicleType, Capacity };
