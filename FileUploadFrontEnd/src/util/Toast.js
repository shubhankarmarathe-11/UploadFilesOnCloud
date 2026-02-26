import { toast } from "react-hot-toast";

function Toastfun({ type, message }) {
  if (type == "error") {
    return toast.error(message, {
      position: "top-center",
    });
  } else {
    return toast.success(message, {
      position: "top-center",
    });
  }
}

export { Toastfun };
