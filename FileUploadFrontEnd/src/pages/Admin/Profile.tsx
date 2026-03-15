import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import axios from "axios";
import ToastFun from "@/components/Toast";
import { Toaster } from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, SetuserData] = useState<any>({});
  const [Loading, SetLoading] = useState(false);

  const Navigate = useNavigate();

  const FetchDetails = async () => {
    await axios
      .get("/api/user/getprofile")
      .then((res) => {
        console.log(res.data);
        SetuserData(res.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    FetchDetails();
  }, []);

  const OnClickDeleteAccount = async () => {
    await axios
      .delete("/api/user/deleteprofile", { withCredentials: true })

      .then((res) => {
        SetLoading(true);
        ToastFun({ type: "success", message: res.data });
        Navigate("/");
      })

      .catch((err: any) => {
        ToastFun({ type: "error", message: err.response.data });
      });
  };

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
      <div className="flex-1 h-screen flex flex-col gap-8 items-center justify-center">
        <img
          className="border border-black rounded-full w-48 h-48 flex justify-center items-center"
          src={userData.profileimg}
          alt="Profile img"
        />

        <Card className="w-3/5">
          <CardTitle className="text-center my-5">
            <h1 className="text-blue-600">Welcome</h1>
            {userData.name}
          </CardTitle>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Storage Used</TableHead>
                  <TableHead className="">Storage Remain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={userData._id}>
                  <TableCell className="font-medium">{userData.name}</TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>{userData.storage_used} MB</TableCell>
                  <TableCell className="">
                    {userData.storage_remain} MB
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className=" ">
              <p className="my-5 text-red-600 cursor-pointer">
                Change Password
              </p>
              <Button className="my-5" onClick={OnClickDeleteAccount}>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
