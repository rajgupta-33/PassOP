import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  site: String,
  username: String,
  password: String
});

export default mongoose.model("Password", PasswordSchema);
