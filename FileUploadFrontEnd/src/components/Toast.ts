import toast from "react-hot-toast";

interface input {
  type: string;
  message: string;
}

export default function ToastFun({ type, message }: input) {
  if (type == "error") return toast.error(message, { position: "top-center" });

  return toast.success(message, { position: "top-center" });
}
