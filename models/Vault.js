import mongoose from "mongoose";

const VaultSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Vault Name is required!"],
		trim: true,
	},
    address: {
		type: String,
		required: [true, "Asset address is required!"],
		trim: true,
	},
	symbol: {
		type: String,
		required: [true, "Symbol is required!"],
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Valut ||
	mongoose.model("Valut", VaultSchema);
