const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: 'Story',
    }],
    userStories : [{
      type: Schema.Types.ObjectId,
      ref: "Story",
    }],
    profilePicUrl: {
      type: String,
    },
    profileBio : {
      type: String,
      default: ""
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
