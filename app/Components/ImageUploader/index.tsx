import { ChangeEvent, FC } from "react";
import { uploadFiles } from "react-firebase-lib";
import { BiCloudUpload } from "react-icons/bi";
import { storage } from "../../../firebase";

interface IProps {
  setImageURL: (songImageUrl: string) => void;
  isLoading: (isImageLoading: boolean) => void;
  setProgress: (uploadProgress: number) => void;
  isImage: boolean;
}

export type InputChange = ChangeEvent<HTMLInputElement>;

const ImageUploader: FC<IProps> = ({
  setImageURL,
  isLoading,
  setProgress,
  isImage,
}) => {
  const uploadImage = async (e: InputChange) => {
    if (!e.target.files) return;
    isLoading(true);
    setProgress(0);
    const res = await uploadFiles(storage, "avatar", [
      ...e.target.files,
    ] as File[]);
    setProgress(100);
    isLoading(false);
    setImageURL(res[0]);
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            click to upload {isImage ? "image" : "audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-image"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
        onChange={uploadImage}
      />
    </label>
  );
};

export default ImageUploader;
