import { UserDetail, UserFileConnection } from "./user.model.js";
import bcrypt from "bcryptjs";
import { RedisCli } from "../../RedisConnection.js";

const CreateDocument = async ({ name, email, mob, password }) => {
  let createUser;
  try {
    let hashpass = await bcrypt.hash(String(password), 10);
    if (!hashpass) return null;

    let FindUser = await UserDetail.findOne({ Email: email });

    if (FindUser != null) return 406;

    FindUser = await UserDetail.findOne({ Number: mob });

    if (FindUser != null) return 406;

    createUser = await UserDetail.create({
      Name: name,
      Email: email,
      Number: mob,
      Password: hashpass,
    });

    const CreateFileConnection = await UserFileConnection.create({
      UserId: createUser._id,
    });

    (await createUser).UserConnectionId = CreateFileConnection._id;
    (await createUser).save();
    return createUser;
  } catch (error) {
    console.log(error);

    if (createUser?._id) {
      await UserDetail.deleteOne({ _id: createUser?._id });
    }
    return null;
  }
};

const CreateUserwithGoogle = async ({ email, name, picture, sub }) => {
  let createUser;
  try {
    createUser = await UserDetail.create({
      Name: name,
      Email: email,
      ProfileUrl: picture,
      GoogleId: sub,
    });
    const CreateFileConnection = await UserFileConnection.create({
      UserId: createUser._id,
    });

    (await createUser).UserConnectionId = CreateFileConnection._id;
    (await createUser).save();
    return createUser;
  } catch (error) {
    console.log(error);

    if (createUser?._id) {
      await UserDetail.deleteOne({ _id: createUser?._id });
    }
    return null;
  }
};

const LoginUser = async ({ email, password }) => {
  try {
    let FindUser = await UserDetail.findOne({ Email: email });
    if (FindUser == null) return 404;

    let comparepass = await bcrypt.compare(password, FindUser.Password);
    if (!comparepass) return 406;

    return FindUser;
  } catch (error) {
    return null;
  }
};

const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

const UpdateStorageLimit = async ({ userId, filesize, RToken, operation }) => {
  try {
    if (operation == "upload") {
      let UpdateStorage = await UserDetail.findById(userId, { Password: 0 });
      if (UpdateStorage != null) {
        UpdateStorage.storage_used_bytes =
          (await UpdateStorage.storage_used_bytes) + Number(filesize);
        UpdateStorage.Storagelimit_bytes =
          (await UpdateStorage.Storagelimit_bytes) - Number(filesize);

        await UpdateStorage.save();

        await RedisCli.del(String(userId));
        await RedisCli.set(
          String(userId),
          JSON.stringify({
            _id: UpdateStorage._id,
            name: UpdateStorage.Name,
            email: UpdateStorage.Email,
            mob: UpdateStorage.Number,
            profileimg: UpdateStorage.ProfileUrl,
            storage_used: await bytesToMB(UpdateStorage.storage_used_bytes),
            storage_remain: await bytesToMB(UpdateStorage.Storagelimit_bytes),
          }),
        );

        return 200;
      }

      return 404;
    } else {
      let UpdateStorage = await UserDetail.findById(userId, { Password: 0 });
      if (UpdateStorage != null) {
        UpdateStorage.storage_used_bytes =
          (await UpdateStorage.storage_used_bytes) - Number(filesize);
        UpdateStorage.Storagelimit_bytes =
          (await UpdateStorage.Storagelimit_bytes) + Number(filesize);

        await UpdateStorage.save();

        await RedisCli.del(userId);
        await RedisCli.set(
          String(userId),
          JSON.stringify({
            _id: UpdateStorage._id,
            name: UpdateStorage.Name,
            email: UpdateStorage.Email,
            mob: UpdateStorage.Number,
            profileimg: UpdateStorage.ProfileUrl,
            storage_used: await bytesToMB(UpdateStorage.storage_used_bytes),
            storage_remain: await bytesToMB(UpdateStorage.Storagelimit_bytes),
          }),
        );

        return 200;
      }

      return 404;
    }
  } catch (error) {
    return null;
  }
};

const DeleteAccount = async ({ userId }) => {
  try {
    const userDelete = await UserDetail.deleteOne({ _id: userId });
    if (!userDelete.deletedCount) return 400;

    const fileDelete = await UserFileConnection.deleteOne({ UserId: userId });

    if (!fileDelete.deletedCount) return 400;

    return 200;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const FindUserWithEmail = async ({ Email }) => {
  try {
    let FetchDetails = await UserDetail.findOne({ Email: Email });
    if (FetchDetails == null) return 404;

    return FetchDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  CreateDocument,
  LoginUser,
  UpdateStorageLimit,
  FindUserWithEmail,
  CreateUserwithGoogle,
  DeleteAccount,
};
