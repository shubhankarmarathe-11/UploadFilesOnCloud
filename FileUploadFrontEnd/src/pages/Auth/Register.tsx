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
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import ToastFun from "@/components/Toast";

const Register = () => {
  const [Cred, SetCred] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [show, Setshow] = useState(false);

  const SubmitForm = async () => {
    await axios
      .post("/api/register", {
        name: Cred.name,
        email: Cred.email,
        number: Cred.number,
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

  useEffect(() => {}, []);
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
          </FieldGroup>
        </form>
      </div>
    </>
  );
};

export default Register;
