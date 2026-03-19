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

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Eye, EyeOffIcon, UserKey } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import axios from "axios";
import ToastFun from "@/components/Toast";
import { Toaster } from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

import { useLoggedIn } from "@/Store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, SetuserData] = useState<any>({});
  const [Loading, SetLoading] = useState(false);

  const [show, Setshow] = useState(false);
  const [showcon, Setshowcon] = useState(false);

  const [PasswordCard, SetShowPasswordCard] = useState({
    show: false,
    password: "",
    confirmpass: "",
  });

  useEffect(() => {
    FetchDetails();
  }, []);

  const setLoggedIn = useLoggedIn((s) => s.setLoggedIn);

  const Navigate = useNavigate();

  async function AccessToken() {
    await axios
      .get("/api/global/refresh", { withCredentials: true })
      .then((res) => {
        if (res.status == 201) {
          return ToastFun({ type: "success", message: "try again" });
        }
      })

      .catch((err) => {
        if (err.response.status == 401) {
          setLoggedIn(false);
          Navigate("/login");
        }
      });
  }

  const FetchDetails = async () => {
    await axios
      .get("/api/user/getprofile")
      .then((res) => {
        console.log(res.data);
        SetuserData(res.data);
      })
      .catch(() => {});
  };

  const OnClickDeleteAccount = async () => {
    await axios
      .delete("/api/user/deleteprofile", { withCredentials: true })

      .then((res) => {
        SetLoading(true);
        setLoggedIn(false);
        ToastFun({ type: "success", message: res.data });
        Navigate("/");
      })

      .catch((err: any) => {
        ToastFun({ type: "error", message: err.response.data });
      });
  };

  const OnSubmitChangePass = async () => {
    if (PasswordCard.password != PasswordCard.confirmpass)
      return ToastFun({ type: "error", message: "password not matched" });

    // SetShowPasswordCard({ ...PasswordCard, show: false });
    // SetLoading(true);
    await axios
      .patch(
        "/api/user/updateprofile",
        { password: PasswordCard.password },
        { withCredentials: true },
      )
      .then((res) => {
        ToastFun({ type: "success", message: res.data });
      })
      .catch((err) => {
        if (err.response.status == 401) {
          AccessToken();
        }
        if (err.response.status == 406) {
          setLoggedIn(false);
          Navigate("/login");
        }
        return ToastFun({ type: "error", message: err.response.data });
      });
  };

  if (PasswordCard.show)
    return (
      <>
        <Toaster />
        <div className="flex-1 h-56 flex flex-col justify-center items-center">
          <form
            className="sm:w-2/6"
            onSubmit={(e) => {
              e.preventDefault();
              OnSubmitChangePass();
            }}
          >
            <h2 className="flex items-center justify-center text-center gap-3 text-3xl">
              <UserKey size={30} /> Change Password
            </h2>
            <FieldGroup className="my-8">
              <Field>
                <FieldLabel htmlFor="fieldgroup-password">
                  New Password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="inline-end-input"
                    type={show ? "text" : "password"}
                    required={true}
                    placeholder="Enter password"
                    value={PasswordCard.password}
                    onChange={(e) => {
                      SetShowPasswordCard({
                        ...PasswordCard,
                        password: e.target.value,
                      });
                    }}
                  />
                  <InputGroupAddon
                    onClick={() => {
                      Setshow(!show);
                    }}
                    align="inline-end"
                  >
                    {show ? (
                      <Eye className="cursor-pointer" />
                    ) : (
                      <EyeOffIcon className="cursor-pointer" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="fieldgroup-confirmpassword">
                  Confirm Password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="inline-end-input"
                    type={showcon ? "text" : "password"}
                    required={true}
                    placeholder="Enter password"
                    value={PasswordCard.confirmpass}
                    onChange={(e) => {
                      SetShowPasswordCard({
                        ...PasswordCard,
                        confirmpass: e.target.value,
                      });
                    }}
                  />
                  <InputGroupAddon
                    onClick={() => {
                      Setshowcon(!showcon);
                    }}
                    align="inline-end"
                  >
                    {showcon ? (
                      <Eye className="cursor-pointer" />
                    ) : (
                      <EyeOffIcon className="cursor-pointer" />
                    )}
                  </InputGroupAddon>
                </InputGroup>

                <Button>Change Password</Button>
                <p
                  className="text-violet-600 cursor-pointer"
                  onClick={() => {
                    SetShowPasswordCard({ ...PasswordCard, show: false });
                  }}
                >
                  back to profile
                </p>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </>
    );

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
              <p
                onClick={() => {
                  SetShowPasswordCard({ ...PasswordCard, show: true });
                }}
                className="my-5 text-red-600 cursor-pointer"
              >
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
