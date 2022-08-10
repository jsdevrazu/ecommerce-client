import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase";

export const apiEndPoint = process.env.NEXT_PUBLIC_APP_PROXY;

export const deleteImageObject = (imageUrl: string, setFunc:(image:string) => void) => {
  const deleteRef = ref(storage, imageUrl);
  deleteObject(deleteRef).then(() => {
    toast.success("success");
    toast.error("File removed successfully");
    setFunc("")
  });
};
