import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  url: string | null;
}

function ImageItem({ url }: Props) {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchUrl(url!);
  }, [url]);

  const fetchUrl = async (key: string) => {
    const url = await Storage.get(key);
    setImageUrl(url);
  };

  return (
    <div className={classes.imageItem}>
      <img className={classes.imageItem_item} src={imageUrl!} alt="posts"></img>
    </div>
  );
}

export default ImageItem;

const useStyles = makeStyles(() => ({
  imageItem: {
    height: 250,
    width: 250,
    margin: 10,
  },
  imageItem_item: {
    height: "100%",
    width: "100%",
  },
}));
