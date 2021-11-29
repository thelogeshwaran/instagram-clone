import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import BackupIcon from "@material-ui/icons/Backup";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Typography } from "@material-ui/core";
import { Storage } from "aws-amplify";
import { createPost } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { useDataProvider } from "../../Context/DataContext";
import { CreatePostMutation } from "../../API";
import { GraphQLResult } from "@aws-amplify/api";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: React.FC<IProps> = ({ setOpen }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { user } = useDataProvider();

  const classes = useStyles();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const response = await await Storage.put(file.name, file, {
        level: "public",
        contentType: "image/png",
        progressCallback(progress) {
          setProgress((progress.loaded / progress.total) * 100);
        },
      });

      createNewPost(response.key);
      console.log(response.key);
    }
  };
  async function createNewPost(url: string) {
    const data = {
      username: user.username,
      imageUrl: url,
      caption: caption,
      likes: [],
      postUserId: user.id,
    };
    (await API.graphql(
      graphqlOperation(createPost, { input: data })
    )) as GraphQLResult<CreatePostMutation>;
    setFile(null);
    setProgress(0);
    setOpen(false);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Box className={classes.heading}>
        <Typography variant="h5">Create New Post</Typography>
      </Box>
      <Box>
        <TextField
          className={classes.caption_input}
          onChange={(e) => setCaption(e.target.value)}
          label="Enter a caption"
          variant="outlined"
          autoFocus
          value={caption}
          required
        />
      </Box>
      <Box>
        <input
          className={classes.image_input}
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            className={classes.image_button}
            startIcon={<AddAPhotoIcon />}
            variant="contained"
            component="span"
          >
            Image
          </Button>
        </label>
      </Box>
      <Box>{file && file.name}</Box>

      <Box className={classes.upload_button}>
        <Button
          type="submit"
          startIcon={<BackupIcon />}
          variant="contained"
          color="primary"
        >
          Post
        </Button>
      </Box>
      <Box className={classes.progress}>
        <div
          className={classes.progressbar}
          style={{ width: progress + "%" }}
        ></div>
      </Box>
    </form>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid lightgray ",
    width: 500,
    margin: "0 auto",
    backgroundColor: "white",
    alignItems: "center",
    height: 350,
  },
  heading: {
    textAlign: "center",
    borderBottom: "1px solid lightgray",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  caption_input: {
    margin: 10,
    marginTop: 40,
    width: 400,
  },
  image_button: {
    margin: 10,
  },
  upload_button: {
    margin: 10,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  image_input: {
    display: "none",
  },
  progress: {
    width: "90%",
  },
  progressbar: {
    height: 5,
    backgroundColor: "black",
    borderRadius: 10,
  },
}));

export default ImageUploader;
