import { RedisCli } from "../../RedisConnection.js";
import multer from "multer";
import { UploadFileModel, RetriveUploadedFiles } from "./file.services.js";
import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;

const FileUploadController = async (req, res) => {
  try {
    const RToken = req.cookies.host_auth_refresh;

    let result = JSON.parse(await RedisCli.get(String(RToken)));

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(
          null,
          path.join(__dirname, `../../../uploads/${String(result._id)}`),
        );
      },

      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        const filename = uniqueSuffix + "-" + file.originalname;

        cb(null, filename);
      },
    });

    const upload = multer({
      storage: storage,
    });

    upload.single("file")(req, res, async function (err) {
      if (err) {
        return res.status(400).send("Upload error");
      }

      let UpdateInDb = await UploadFileModel({
        userId: result._id,
        filedata: req.file,
      });

      if (UpdateInDb == null || UpdateInDb == 400) {
        const filePath = path.join(
          __dirname,
          `../../../uploads/${req.file.filename}`,
        );

        await fs.promises.rm(filePath, { force: true });
        return res.status(400).send("Upload error");
      }

      res.status(201).send("File uploaded successfully");
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
};

const FetchFilesController = async (req, res) => {
  try {
    const RToken = req.cookies.host_auth_refresh;

    let result = JSON.parse(await RedisCli.get(String(RToken)));

    let Data = JSON.parse(await RedisCli.get(`${result._id}_FilesData`));

    if (Data != null && Data.length > 0) {
      return res.status(200).send({ data: Data });
    }

    Data = await RetriveUploadedFiles({ userId: result._id });

    if (Data == null || Data == 404)
      return res.status(400).send("Error while Fetching Details");

    return res.status(200).send({ data: Data });
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
};

export { FileUploadController, FetchFilesController };
