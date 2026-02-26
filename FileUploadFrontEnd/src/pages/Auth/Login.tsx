import { useState, useEffect } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOffIcon, UserKey } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link } from "react-router-dom";
import axios from "axios";
import ToastFun from "@/components/Toast";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [Cred, SetCred] = useState({ email: "", password: "" });
  const [show, Setshow] = useState(false);

  const SubmitForm = async () => {
    await axios
      .post("/api/login", {
        email: Cred.email,
        password: Cred.password,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);

        if (err.response.status == 404) {
          ToastFun({ type: "error", message: "Server not found" });
        }
      });
  };

  return (
    <>
      <Toaster />
      <div className="flex-1 h-screen flex flex-col justify-center items-center">
        <form
          className="sm:w-2/6"
          onSubmit={(e) => {
            e.preventDefault();
            SubmitForm();
          }}
        >
          <h2 className="flex items-center justify-center text-center gap-3 text-3xl">
            <UserKey size={30} /> Login Now To Upload Files
          </h2>
          <FieldGroup className="my-8">
            <Field>
              <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
              <Input
                id="fieldgroup-email"
                type="email"
                placeholder="Enter Email"
                required={true}
                value={Cred.email}
                onChange={(e) => {
                  SetCred({ ...Cred, email: e.target.value });
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="inline-end-input"
                  type={show ? "text" : "password"}
                  required={true}
                  placeholder="Enter password"
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

              <Link className="text-violet-500" to={"/changepassword"}>
                Forgotten password?
              </Link>
            </Field>

            <Field orientation="horizontal">
              <Button type="submit">Login</Button>
              <Link to={"/register"}>Register</Link>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  );
};

export default Login;
