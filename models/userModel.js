import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field is required"],
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true,
      match:[/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10)          // random salt banaya
    const hashedPassword = await bcrypt.hash(this.password, salt)   // password + salt ko hash kiya
    this.password = hashedPassword                  // plaintext ko hash se replace kiya
  }
  next()
})



const User = mongoose.model("User", userSchema)


export default User