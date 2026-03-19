import { useEffect, useState } from "react";
import Upload_Files from "./Upload_Files";
import Profile from "./Profile";
import { Spinner } from "@/components/ui/spinner";
import { useLoggedIn } from "@/Store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastFun from "@/components/Toast";
import { Toaster } from "react-hot-toast";
import { FilesList } from "./Files";

const Admin = () => {
  const [AdminComponentRender, SetComponentRender] = useState({
    upload: true,
    files: false,
    profile: false,
  });
  const [Loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  const islogged = useLoggedIn((s) => s.islogged);
  const setLoggedIn = useLoggedIn((s) => s.setLoggedIn);

  const [refresh, Setrefresh] = useState(true);

  const FetchIsLoggedIn = async () => {
    await axios
      .get("/api/global/isLoggedin", { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          setLoggedIn(true);
          Setrefresh(!refresh);
        }
      })
      .catch((err) => {
        if (err.response.status == 409) {
          setLoggedIn(false);
          Navigate("/login");
        }
      });
  };

  useEffect(() => {
    console.log(islogged);

    if (islogged) {
      setLoading(false);
    } else {
      FetchIsLoggedIn();
    }
  }, [refresh]);

  if (Loading)
    return (
      <>
        <Toaster />
        <div className="flex-1 h-screen flex items-center justify-center gap-6">
          <Spinner className="size-16" />
        </div>
      </>
    );

  return (
    <>
      <Toaster />
      <div className="flex-1 h-screen flex flex-col">
        <nav className="flex p-5 gap-5">
          <p
            onClick={() => {
              SetComponentRender({
                upload: true,
                files: false,
                profile: false,
              });
            }}
            className={` cursor-pointer ${
              AdminComponentRender.upload ? "font-bold" : "font-light"
            }`}
          >
            Upload Files
          </p>
          <p
            onClick={() => {
              SetComponentRender({
                upload: false,
                files: true,
                profile: false,
              });
            }}
            className={`cursor-pointer ${AdminComponentRender.files ? "font-bold" : "font-light"}`}
          >
            Files
          </p>
          <p
            onClick={() => {
              SetComponentRender({
                upload: false,
                files: false,
                profile: true,
              });
            }}
            className={`cursor-pointer ${AdminComponentRender.profile ? "font-bold" : "font-light"}`}
          >
            Profile
          </p>
          <p
            onClick={async () => {
              await axios
                .get("/api/auth/logout", { withCredentials: true })
                .then((res) => {
                  if (res.status == 201) {
                    setLoading(true);
                    ToastFun({ type: "success", message: res.data });
                    setTimeout(() => {
                      setLoggedIn(false);
                      Setrefresh(!refresh);
                    }, 2000);
                  }
                })
                .catch((err) => {
                  ToastFun({ type: "error", message: err.response.data });
                });
            }}
            className={`cursor-pointer text-red-700`}
          >
            Logout
          </p>
        </nav>
        <div className="flex-1 p-5 w-full ">
          {AdminComponentRender.upload ? <Upload_Files /> : null}
          {AdminComponentRender.profile ? <Profile /> : null}
          {AdminComponentRender.files ? <FilesList /> : null}
        </div>
      </div>
    </>
  );
};

export default Admin;
