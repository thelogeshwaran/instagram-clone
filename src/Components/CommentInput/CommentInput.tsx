import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  submitComment: (arg0: string) => void;
}

const CommentInput: React.FC<Props> = ({ submitComment }) => {
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
        label=" Enter a comment"
        className={classes.commentbox}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <IconButton
        aria-label="share"
        onClick={() => comment && updateComment(comment)}
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
    width: "85%",
  },
}));
