import mongoose, { Schema } from "mongoose";

const FileAndUserConnection = new mongoose.Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "userdetail",
    required: true,
  },
  Files: [
    {
      _fileid: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      Data: {
        type: Object,
        default: {},
      },
      DateTime: {
        type: String,
        default: "",
      },
    },
  ],
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
    unique: true,
  },
  Password: {
    type: String,
    default: "",
  },

  GoogleId: {
    type: String,
    default: "",
  },
  ProfileUrl: {
    type: String,
    default: "",
  },

  GoogleId: {
    type: String,
    default: "",
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

FileAndUserConnection.index({ "Files._fileid": 1 });

const UserDetail = mongoose.model("userdetail", UserDetails);
const UserFileConnection = mongoose.model(
  "fileanduserconnection",
  FileAndUserConnection,
);

export { UserDetail, UserFileConnection };
