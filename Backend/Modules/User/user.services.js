import { UserDetail, UserFileConnection } from "./user.model.js";
import bcrypt from "bcryptjs";

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

const UpdateStorageLimit = async ({ userId, filesize }) => {
  try {
    let UpdateStorage = await UserDetail.findById(userId);
    if (UpdateStorage != null) {
      UpdateStorage.storage_used_bytes =
        (await UpdateStorage.storage_used_bytes) + Number(filesize);
      UpdateStorage.Storagelimit_bytes =
        (await UpdateStorage.Storagelimit_bytes) - Number(filesize);

      UpdateStorage.save();
      return 200;
    }

    return 404;
  } catch (error) {
    return null;
  }
};

export { CreateDocument, LoginUser, UpdateStorageLimit };
