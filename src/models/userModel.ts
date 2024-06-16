import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
const User = mongoose.models.Users || mongoose.model("User", userSchema);

export default User;

// import mongoose, { model, models } from "mongoose";

// // Define mongoose schemas
// const userSchema = new mongoose.Schema({
//   username: { type: String },
//   password: String,
//   statusToken: String,
//   purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
// });

// const adminSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   statusToken: String,
// });

// const courseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   imageLink: String,
//   published: Boolean,
// });

// export const User = models.User || model("User", userSchema);
// export const Admin = models.Admin || model("Admin", adminSchema);
// export const Course = models.Course || model("Course", courseSchema);
