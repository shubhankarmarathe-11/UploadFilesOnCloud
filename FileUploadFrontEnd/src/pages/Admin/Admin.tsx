import { useState } from "react";
import Upload_Files from "./Upload_Files";

const Admin = () => {
  const [AdminComponentRender, SetComponentRender] = useState({
    upload: true,
    files: false,
    profile: false,
  });

  return (
    <>
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
        </nav>
        <div className="flex-1 p-5 w-full ">
          {AdminComponentRender.upload ? <Upload_Files /> : null}
        </div>
      </div>
    </>
  );
};

export default Admin;
