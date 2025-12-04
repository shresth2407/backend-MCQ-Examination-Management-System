const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const base = process.env.MONGO_URI || "mongodb://localhost:27017";
    const dbName = process.env.DB_NAME || "mcq_exam_db";
    const uri = `${base}/${dbName}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected to", uri);
  } catch (err) {
    console.error("DB Error", err);
    process.exit(1);
  }
};
