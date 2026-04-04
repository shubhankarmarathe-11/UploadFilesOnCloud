import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoggedIn } from "@/Store/authStore";
import { useNavigate } from "react-router-dom";
import { File, EllipsisVertical } from "lucide-react";
import { Toaster } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ToastFun from "@/components/Toast";

const renderPreview = (file: any) => {
  const API = import.meta.env.VITE_API_URL;
  const url = `${API}/api/global/file/${file.Data.filename}`; // your secure file route

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
  const API = import.meta.env.VITE_API_URL;
  const [files, Setfiles] = useState<[]>([]);

  const [refresh, Setrefresh] = useState(false);

  const setLoggedIn = useLoggedIn((s) => s.setLoggedIn);

  const Navigation = useNavigate();

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

  async function FetchFilesData() {
    await axios
      .get(`${API}/api/file/fetchfiles`, { withCredentials: true })
      .then((res) => {
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
      .get(`${API}/api/global/deletefile/${filename}`, {
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
        ToastFun({ type: "error", message: err.response.data });
      });
  };

  const DeleteFileBtn = async (filename: any, fileid: any, filesize: any) => {
    await axios
      .delete(`${API}/api/file/deletefiles/${fileid}/${filename}/${filesize}`, {
        withCredentials: true,
      })
      .then((res) => {
        ToastFun({ type: "success", message: res.data });
        Setrefresh(!refresh);
      })
      .catch((err) => {
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
                className="cursor-pointer hover:shadow-lg w-96 h-80 overflow-y-auto"
              >
                <CardContent className="p-2 border-2  border-gray-400 rounded-md m-5">
                  {renderPreview(file)}
                </CardContent>

                <CardHeader>
                  <CardTitle className="text-sm truncate flex justify-between items-center  gap-5">
                    <p className="w-80">{file.Data.originalname}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="text-sm w-auto">
                          <EllipsisVertical />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="" align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>File details</DropdownMenuLabel>
                          <DropdownMenuItem className="flex items-center justify-between">
                            <p>Type</p>
                            <p className="w-80 text-right">
                              {file.Data.mimetype}
                            </p>
                          </DropdownMenuItem>
                          <DropdownMenuLabel></DropdownMenuLabel>
                          <DropdownMenuItem>
                            <p>Size</p>
                            <p className="w-80 text-right">
                              {(file.Data.size / 1024).toFixed(2)} KB
                            </p>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              DownloadFileBtn(file.Data.filename);
                            }}
                            className="text-red-500 cursor-pointer"
                          >
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              DeleteFileBtn(
                                file.Data.filename,
                                file._fileid,
                                file.Data.size,
                              );
                            }}
                            className="text-red-500 cursor-pointer"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                </CardHeader>

                <CardContent></CardContent>

                {/* <CardContent>
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
                </CardContent> */}
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}

export { FilesList };
