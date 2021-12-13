import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  submitComment: (comment: string) => void;
  disabled: boolean;
  label: string;
  width: string | number;
}

const CommentInput: React.FC<Props> = ({
  submitComment,
  disabled,
  label,
  width,
}) => {
  const classes = useStyles();
  const [comment, setComment] = useState<string | null>("");
  const updateComment = async (comment: string) => {
    await submitComment(comment);
    setComment("");
  };
  return (
    <div className={classes.commentInput}>
      <TextField
        id="standard-basic"
        label={label}
        className={classes.commentbox}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={disabled}
        style={{ width: width }}
      />
      <IconButton
        aria-label="share"
        onClick={() => comment && updateComment(comment)}
        disabled={disabled}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default CommentInput;

const useStyles = makeStyles(() => ({
  commentInput: {
    display: "flex",
    justifyContent: "center",
  },
  commentbox: {
    margin: 0,
  },
}));
