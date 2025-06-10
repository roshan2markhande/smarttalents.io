const mongoose = require("mongoose");

const brandingSchema = new mongoose.Schema({
  primaryColor: { type: String, default: "#1e2a38" },
  secondaryColor: { type: String, default: "#2e3a49" },
  fontFamily: { type: String, default: "Arial, sans-serif" },
  logoUrl: { type: String },
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  branding: brandingSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports=mongoose.model('branding',brandingSchema);
module.exports=mongoose.model('company',companySchema);