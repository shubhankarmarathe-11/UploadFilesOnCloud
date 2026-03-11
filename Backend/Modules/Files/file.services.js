import { UserFileConnection } from "../User/user.model.js";
import { UpdateStorageLimit } from "../User/user.services.js";
import { RedisCli } from "../../RedisConnection.js";

const UploadFileModel = async ({ userId, filedata }) => {
  try {
    let CreateFileModel = await UserFileConnection.updateOne(
      { UserId: userId },
      { $push: { Files: filedata } },
    );

    if (CreateFileModel.modifiedCount == 1) {
      let Update = await UpdateStorageLimit({
        userId: userId,
        filesize: filedata.size,
      });

      if (Update == 404) {
        await UserFileConnection.updateOne(
          { UserId: userId },
          { $pop: { Files } },
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

export { UploadFileModel, RetriveUploadedFiles };
