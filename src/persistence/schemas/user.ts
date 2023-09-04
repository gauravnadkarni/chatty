
import mongoose from 'mongoose';
import User from '../models/db/user';
const { Schema } = mongoose;

const userSchema = new Schema<User>({
  email: {
      type: String,
      require: true
  },
  password: {
      type: String,
      require: true
  },
  fullName: {
    type: String,
    require: true
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
