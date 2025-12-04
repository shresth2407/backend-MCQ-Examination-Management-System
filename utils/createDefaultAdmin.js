const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function createDefaultAdmin() {
  try {
    const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
    const password = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@1234";

    let admin = await User.findOne({ email });
    if (!admin) {
      const hash = await bcrypt.hash(password, 10);
      await User.create({
        name: "Super Admin",
        email,
        passwordHash: hash,
        role: "admin"
      });
      console.log("Default admin created:", email);
    } else {
      console.log("Default admin already exists");
    }
  } catch (err) {
    console.error("Error creating default admin:", err.message);
  }
}

module.exports = createDefaultAdmin;
