import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import axios from "axios";

const Profile = () => {
  const [userData, SetuserData] = useState({});

  const FetchDetails = async () => {
    await axios
      .get("/api/user/getprofile")
      .then((res) => {
        console.log(res.data);
        SetuserData(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    FetchDetails();
  }, []);

  return (
    <>
      <div className="flex-1 h-screen flex flex-col gap-8 items-center justify-center">
        <img
          className="border border-black rounded-full w-48"
          src={userData.profileimg}
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
              <Button className="my-5">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
