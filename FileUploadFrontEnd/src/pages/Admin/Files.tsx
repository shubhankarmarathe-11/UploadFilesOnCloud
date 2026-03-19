import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoggedIn } from "@/Store/authStore";
import { useNavigate } from "react-router-dom";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";

import ToastFun from "@/components/Toast";

const renderPreview = (file: any) => {
  const url = `/api/global/file/${file.Data.filename}`; // your secure file route

  if (file.Data.mimetype.startsWith("image/")) {
    return (
      <img src={url} alt={file.Data.name} className="h-32 w-full  rounded" />
    );
  }

  if (file.Data.mimetype === "application/pdf") {
    return <iframe src={url} className="h-32 w-full rounded" />;
  }

  if (file.Data.mimetype.startsWith("video/")) {
    return <video src={url} controls className="h-32 w-full rounded" />;
  }

  if (file.Data.mimetype.startsWith("audio/")) {
    return <audio src={url} controls className="w-full h-32 rounded" />;
  }

  // fallback preview
  return (
    <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
      <File className="h-10 w-10 mb-2 text-primary" />
    </div>
  );
};

function FilesList() {
  const [files, Setfiles] = useState<[]>([]);

  const [refresh, Setrefresh] = useState(false);

  const setLoggedIn = useLoggedIn((s) => s.setLoggedIn);

  const Navigation = useNavigate();

  async function AccessToken() {
    await axios
      .get("/api/global/refresh", { withCredentials: true })
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

  async function FetchFilesData() {
    await axios
      .get("/api/file/fetchfiles", { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        Setfiles(res.data.data);
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

  const DownloadFileBtn = async (filename: any) => {
    await axios
      .get(`/api/global/deletefile/${filename}`, {
        withCredentials: true,
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);

        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteFileBtn = async (filename: any, fileid: any, filesize: any) => {
    await axios
      .delete(`/api/file/deletefiles/${fileid}/${filename}/${filesize}`, {
        withCredentials: true,
      })
      .then((res) => {
        ToastFun({ type: "success", message: res.data });
        Setrefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);

        ToastFun({ type: "error", message: err.response.data });
      });
  };

  useEffect(() => {
    FetchFilesData();
  }, [refresh]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col sm:flex-row gap-5 flex-wrap items-center justify-center">
        {files.length == 0 ? (
          <>
            <h1 className="text-2xl">Files not Found</h1>
          </>
        ) : (
          files.map((file: any) => {
            return (
              <Card
                key={file._fileid}
                className="cursor-pointer hover:shadow-lg w-96 h-96 overflow-y-auto"
              >
                <CardContent className="p-2 border-2  border-gray-400 rounded-md m-5">
                  {renderPreview(file)}
                </CardContent>

                <CardHeader>
                  <CardTitle className="text-sm truncate">
                    {file.Data.originalname}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p>Type:</p>
                  <p className="text-sm">{file.Data.mimetype}</p>

                  <p className="mt-3">Size:</p>
                  <p className="text-sm">
                    {(file.Data.size / 1024).toFixed(2)} KB
                  </p>

                  <span className="my-5 flex justify-start items-center gap-5">
                    <Button
                      onClick={() => {
                        DownloadFileBtn(file.Data.filename);
                      }}
                      className=""
                    >
                      Download File
                    </Button>
                    <h1
                      onClick={() => {
                        DeleteFileBtn(
                          file.Data.filename,
                          file._fileid,
                          file.Data.size,
                        );
                      }}
                      className="text-red-600"
                    >
                      Delete File
                    </h1>
                  </span>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}

export { FilesList };
