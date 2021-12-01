import React from "react";
import PostCard from "../../Components/Post/PostCard";
import { Post } from "../../API";
import { useStore } from "../../Store/PostStore";
import { makeStyles } from "@material-ui/core/styles";

const HomePage = () => {
  const { posts } = useStore();
  const classes = useStyles();

  return (
    <div className={classes.homePage}>
      {posts.map((item: Post | null) => {
        return <PostCard post={item} key={item?.id} />;
      })}
    </div>
  );
};

export default HomePage;
const useStyles = makeStyles(() => ({
  homePage: {
    display: "flex",
    flexDirection: "column",
  },
}));
