import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useRef, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ToastFun from "@/components/Toast";

import axios from "axios";
import { useLoggedIn } from "@/Store/authStore";
import { useNavigate } from "react-router-dom";

const Upload_Files = () => {
  // const bytesToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  // const islogged = useLoggedIn((s) => s.islogged);
  const API = import.meta.env.VITE_API_URL;
  const setLoggedIn = useLoggedIn((s) => s.setLoggedIn);

  const [refreshPage, SetrefreshPage] = useState(false);

  const [progress, SetProgress] = useState(0);

  const Navigation = useNavigate();

  const [filesData, SetfilesData] = useState<any>([]);

  const [FileArray, SetFileArray] = useState<FileList | null>();

  const OnChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    SetFileArray(e.target.files);
  };

  const fileRef = useRef<HTMLInputElement | null>(null);

  async function AccessToken() {
    await axios
      .get(`${API}/api/global/refresh`, { withCredentials: true })
      .then((res) => {
        if (res.status == 201) {
        }
      })

      .catch((err) => {
        if (err.response.status == 401) {
          setLoggedIn(false);
          Navigation("/login");
        }
      });
  }

  async function UploadFileFun() {
    const formData = new FormData();
    if (FileArray == null || FileArray == undefined)
      return ToastFun({ type: "error", message: "please select file first" });

    for (let val of FileArray) {
      formData.append("file", val);

      await axios
        .post(`${API}/api/file/uploadfile`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            SetProgress(percentage);
          },
        })
        .then((res) => {
          if (res.status == 201) {
            ToastFun({ type: "success", message: res.data });
            formData.delete("file");
            SetProgress(0);
            SetrefreshPage(!refreshPage);
          }
          SetProgress(0);
        })
        .catch((err) => {
          if (err.response.status != 401) {
            ToastFun({ type: "error", message: err.response.data });
            formData.delete("file");
            SetProgress(0);
            SetrefreshPage(!refreshPage);
          }

          if (err.response.status == 401) {
            AccessToken();
          }
        });
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    SetFileArray(null);
  }

  async function FetchFilesData() {
    await axios
      .get(`${API}/api/file/fetchfiles`, { withCredentials: true })
      .then((res) => {
        SetfilesData(res.data.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          AccessToken();
        }
        if (err.response.status == 406) {
          setLoggedIn(false);
          Navigation("/login");
        }
      });
  }

  useEffect(() => {
    FetchFilesData();
  }, [refreshPage]);

  return (
    <>
      <Toaster />
      <div className="flex-1 flex flex-col justify-center items-center w-full my-5">
        <h2 className="text-2xl font-bold mb-6">Upload Your Files</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            UploadFileFun();
          }}
          encType="multipart/form-data"
        >
          <Field className="w-96">
            <FieldLabel htmlFor="picture">Files</FieldLabel>
            <Input
              id="picture"
              ref={fileRef}
              type="file"
              multiple={true}
              onChange={OnChangeFileInput}
            />
            <FieldDescription>Select a Files to upload.</FieldDescription>
          </Field>
          <Button className="my-5" type="submit">
            Upload
          </Button>
        </form>
        <div className="w-[60%] ">
          <h3 className="text-left">Uploading Progress</h3>
          <span className="flex gap-2 justify-center items-center">
            <Progress value={progress} className="w-full" />
            <h3>{progress}%</h3>
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col  w-full my-10">
        <h2 className="text-left text-2xl my-3">Recent Uploads</h2>
        <Table>
          <TableCaption>A list of Recent uploads files</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Filename</TableHead>
              <TableHead className="text-center">type</TableHead>
              <TableHead className="text-center">DateTime</TableHead>
              <TableHead className="text-center">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-auto">
            {filesData.map((val: any) => {
              return (
                <TableRow key={val._fileid}>
                  <TableCell className="font-medium">
                    {val.Data.originalname}
                  </TableCell>
                  <TableCell>{val.Data.mimetype}</TableCell>
                  <TableCell>{val.DateTime}</TableCell>
                  <TableCell className="text-right">
                    {val.Data.size} bytes
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Upload_Files;
