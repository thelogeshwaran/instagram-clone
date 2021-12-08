import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  url: string;
  height?: number;
  width?: number;
  size?: "small" | "medium" | "large";
}

function ImageItem({ url, height, width, size }: Props) {
  const classes = useStyles();

  let imageSize;

  if (size) {
    switch (size) {
      case "small":
        imageSize = {
          height: 250,
          width: 250,
        };
        break;
      case "medium":
        imageSize = {
          height: 350,
          width: 350,
        };
        break;
      case "large":
        imageSize = {
          height: 450,
          width: 450,
        };
        break;
      default:
        imageSize = {
          height: 250,
          width: 250,
        };
        break;
    }
  } else {
    if (height && width) {
      imageSize = {
        height: height,
        width: width,
      };
    } else {
      imageSize = {
        height: 250,
        width: 250,
      };
    }
  }

  return (
    <div className={classes.imageItem} style={imageSize}>
      <img className={classes.imageItem_item} src={url!} alt="posts"></img>
    </div>
  );
}

export default ImageItem;

const useStyles = makeStyles(() => ({
  imageItem: {
    margin: 10,
  },
  imageItem_item: {
    height: "100%",
    width: "100%",
  },
}));
