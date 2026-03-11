import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Profile = () => {
  const [userData, SetuserData] = useState({});

  const FetchDetails = async () => {
    await axios
      .get("/api/user/getprofile")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    FetchDetails();
  }, []);

  return (
    <>
      <div className="flex-1 h-screen flex items-center justify-center"></div>
    </>
  );
};

export default Profile;
