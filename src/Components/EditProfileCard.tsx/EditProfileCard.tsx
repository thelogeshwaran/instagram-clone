import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import BackupIcon from "@material-ui/icons/Backup";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Typography } from "@material-ui/core";

interface IProps {
  color?: "primary" | "secondary";
  disabled?: boolean;
  height?: number;
  width?: number;
  progress?: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, about: string) => void;
  file: File | null;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EditProfileCard({
  handleSubmit,
  height,
  width,
  disabled,
  color,
  progress,
  file,
  handleFileChange,
}: IProps) {
  const [about, setAbout] = useState("");

  const classes = useStyles();

  return (
    <form
      className={classes.root}
      onSubmit={(e) => handleSubmit(e, about)}
      style={{ height: height ? height : 350, width: width ? width : 500 }}
    >
      <Box className={classes.heading}>
        <Typography variant="h5">Edit Your Profile</Typography>
      </Box>
      <Box className={classes.caption_input}>
        <TextField
          className={classes.caption_inputField}
          onChange={(e) => setAbout(e.target.value)}
          label="About"
          variant="outlined"
          autoFocus
          value={about}
          required
          disabled={disabled}
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
          disabled={disabled}
        />
        <label htmlFor="contained-button-file">
          <Button
            className={classes.image_button}
            startIcon={<AddAPhotoIcon />}
            variant="contained"
            component="span"
            disabled={disabled}
            color={color ? color : "primary"}
          >
            Profile Picture
          </Button>
        </label>
      </Box>
      <Box>{file && file.name}</Box>

      <Box className={classes.upload_button}>
        <Button
          type="submit"
          startIcon={<BackupIcon />}
          variant="contained"
          color={color}
          disabled={disabled}
        >
          Save
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
}

export default EditProfileCard;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid lightgray ",
    margin: "0 auto",
    backgroundColor: "white",
    alignItems: "center",
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
    width: "90%",
  },
  caption_inputField: {
    width: "100%",
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
