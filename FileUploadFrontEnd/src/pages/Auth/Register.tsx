import { useState, useEffect } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOffIcon, UserKey } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import ToastFun from "@/components/Toast";
import { Spinner } from "@/components/ui/spinner";
import { useLoggedIn } from "@/Store/authStore";
import GoogleLoginButton from "./GoogleLoginButton";

const Register = () => {
  const API = import.meta.env.VITE_API_URL;

  const [Cred, SetCred] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [show, Setshow] = useState(false);

  const Navigate = useNavigate();

  const SubmitForm = async () => {
    await axios
      .post(`${API}/api/auth/signup`, {
        name: Cred.name,
        email: Cred.email,
        mob: Cred.number,
        password: Cred.password,
      })
      .then((res) => {
        if (res.status == 201) {
          setLoading(true);
          ToastFun({ type: "success", message: res.data });
          setLoggedIn(true);
          setTimeout(() => {
            Navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);

        return ToastFun({ type: "error", message: err.response.data });
      });
  };

  const islogged = useLoggedIn((s) => s.islogged);
  const setLoggedIn = useLoggedIn((s) => s.setLoggedIn);
  const [Loading, setLoading] = useState(true);

  const [refresh, Setrefresh] = useState(true);

  const FetchIsLoggedIn = async () => {
    await axios
      .get(`${API}/api/global/isLoggedin`, { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          setLoggedIn(true);
          Setrefresh(!refresh);
        }
      })
      .catch((err) => {
        if (err.response.status == 409) {
          setLoggedIn(false);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    console.log(islogged);

    if (!islogged) {
      FetchIsLoggedIn();
    } else {
      Navigate("/dashboard");
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
      <div className="flex-1 h-screen flex flex-col justify-center items-center">
        <form
          className="w-96 sm:w-2/6"
          onSubmit={(e) => {
            e.preventDefault();
            SubmitForm();
          }}
        >
          <h2 className="flex items-center justify-center text-center gap-3 text-3xl">
            <UserKey size={30} /> Create new account
          </h2>
          <FieldGroup className="my-8">
            <Field>
              <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
              <Input
                id="fieldgroup-name"
                type="text"
                placeholder="Enter your Name"
                required={true}
                value={Cred.name}
                onChange={(e) => {
                  SetCred({ ...Cred, name: e.target.value });
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
              <Input
                id="fieldgroup-email"
                type="email"
                placeholder="Enter your Email"
                required={true}
                value={Cred.email}
                onChange={(e) => {
                  SetCred({ ...Cred, email: e.target.value });
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-email">Mobile Number</FieldLabel>
              <Input
                id="fieldgroup-number"
                type="text"
                placeholder="Enter your Number"
                required={true}
                value={Cred.number}
                onChange={(e) => {
                  SetCred({ ...Cred, number: e.target.value });
                }}
              />
              <FieldDescription>
                Enter number without country code and zero
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="inline-end-input"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  required={true}
                  value={Cred.password}
                  onChange={(e) => {
                    SetCred({ ...Cred, password: e.target.value });
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

            <Field orientation="horizontal">
              <Button type="submit">Register </Button>
              <Link to={"/login"}>Login</Link>
            </Field>

            <Field
              orientation="horizontal"
              className="flex justify-center items-center"
            >
              <GoogleLoginButton />
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  );
};

export default Register;
