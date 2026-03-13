import { UserFileConnection } from "../User/user.model.js";
import { UpdateStorageLimit } from "../User/user.services.js";
import { RedisCli } from "../../RedisConnection.js";

const UpdateModelAfterDelete = async ({ userId, fileid, RToken, filesize }) => {
  try {
    let FileModel = await UserFileConnection.updateOne(
      { UserId: userId },
      { $pull: { Files: { _fileid: fileid } } },
    );

    let Update = await UpdateStorageLimit({
      userId: userId,
      filesize: filesize,
      RToken: RToken,
      operation: "",
    });

    console.log(Update);

    await RedisCli.del(`${userId}_FilesData`);

    return 200;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const UploadFileModel = async ({ userId, filedata, RToken }) => {
  try {
    let date = new Date();

    let CreateFileModel = await UserFileConnection.updateOne(
      { UserId: userId },
      {
        $push: {
          Files: {
            Data: filedata,
            DateTime: `${date.toDateString()} - ${date.toTimeString()}`,
          },
        },
      },
    );

    if (CreateFileModel.modifiedCount == 1) {
      let Update = await UpdateStorageLimit({
        userId: userId,
        filesize: filedata.size,
        RToken: RToken,
        operation: "upload",
      });

      if (Update == 404) {
        await UserFileConnection.updateOne(
          { UserId: userId },
          { $pull: { Files: { Data: filedata } } },
        );

        return 400;
      }

      await RedisCli.del(`${userId}_FilesData`);

      return 200;
    }

    return 400;
  } catch (error) {
    return null;
  }
};

const RetriveUploadedFiles = async ({ userId }) => {
  try {
    let FetchData = await UserFileConnection.findOne({ UserId: userId });
    console.log(FetchData);

    if (FetchData == null) return 404;

    await RedisCli.set(`${userId}_FilesData`, JSON.stringify(FetchData.Files));

    return FetchData.Files;
  } catch (error) {
    return null;
  }
};

export { UploadFileModel, RetriveUploadedFiles, UpdateModelAfterDelete };
