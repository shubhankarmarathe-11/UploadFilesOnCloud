import mongoose, { Schema } from "mongoose";

const FileAndUserConnection = new mongoose.Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "userdetail",
    required: true,
  },
  Files: [{}],
});

const UserDetails = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Number: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },

  UserConnectionId: {
    type: Schema.Types.ObjectId,
    ref: "fileanduserconnection",
  },

  storage_used_bytes: {
    type: Number,
    default: 0,
    required: true,
  },

  Storagelimit_bytes: {
    type: Number,
    default: 31457280,
    required: true,
  },
});

const UserDetail = mongoose.model("userdetail", UserDetails);
const UserFileConnection = mongoose.model(
  "fileanduserconnection",
  FileAndUserConnection,
);

export { UserDetail, UserFileConnection };
