import React, { useState } from "react";
import { Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { CreatePostMutation } from "../../API";
import { GraphQLResult } from "@aws-amplify/api";
import { updateUser } from "../../graphql/mutations";
import { useDataProvider } from "../../Context/DataContext";
import EditProfileCard from "../EditProfileCard.tsx/EditProfileCard";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditProfile({ setOpen }: IProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { user } = useDataProvider();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    about: string
  ) => {
    e.preventDefault();
    if (file) {
      const response = await await Storage.put(file.name, file, {
        level: "public",
        contentType: "image/png",
        progressCallback(progress) {
          setProgress((progress.loaded / progress.total) * 100);
        },
      });

      updateProfile(response.key, about);
    }
  };

  const updateProfile = async (url: string, about: string) => {
    const data = {
      id: user?.id,
      imageUrl: url,
      about: about,
    };
    try {
      (await API.graphql(
        graphqlOperation(updateUser, { input: data })
      )) as GraphQLResult<CreatePostMutation>;

      setFile(null);
      setProgress(0);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <EditProfileCard
      handleSubmit={handleSubmit}
      handleFileChange={handleFileChange}
      progress={progress}
      file={file}
    />
  );
}

export default EditProfile;
