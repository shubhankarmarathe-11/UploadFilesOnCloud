import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastFun from "@/components/Toast";

export default function GoogleLoginButton() {
  const Navigate = useNavigate();

  const handleSuccess = async (response: any) => {
    const google_token = response.credential;

    try {
      const res = await axios.post("/api/auth/googleauth", { google_token });
      ToastFun({ type: "success", message: res.data });
      setTimeout(() => {
        Navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      console.error("Error:", err);
      return ToastFun({ type: "error", message: err.response.data });
    }
  };

  return (
    <GoogleLogin
      text="signin_with"
      size="large"
      theme="filled_black"
      width={"auto"}
      onSuccess={handleSuccess}
      onError={() => console.log("Login failed")}
    />
  );
}
