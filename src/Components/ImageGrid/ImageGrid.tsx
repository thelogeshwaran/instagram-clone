import React, { useEffect, useState } from "react";
import PostImage from "../PostImage/PostImage";
import { Post } from "../../API";
import { useDataProvider } from "../../Context/DataContext";
import { makeStyles } from "@material-ui/core/styles";

function ImageGrid() {
  const classes = useStyles();
  const [posts, setPosts] = useState<(Post | null)[]>([]);
  const { userProfile } = useDataProvider();

  useEffect(() => {
    userProfile?.posts?.items && setPosts(userProfile?.posts?.items!);
  }, [userProfile]);

  return (
    <div className={classes.imageGrid}>
      {posts.map((item: Post | null) => {
        return <PostImage key={item?.id} keyword={item?.imageUrl!} />;
      })}
    </div>
  );
}

export default ImageGrid;

const useStyles = makeStyles(() => ({
  imageGrid: {
    maxWidth: "900",
    borderTop: "1px solid lightgray",
    magin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));
