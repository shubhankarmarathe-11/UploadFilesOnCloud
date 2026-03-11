import mongoose, { Schema } from "mongoose";

const FileModel = new mongoose.Schema({
  FileData: [{}],
});

const FileModelVar = mongoose.model("filemodel", FileModel);

export { FileModelVar };
