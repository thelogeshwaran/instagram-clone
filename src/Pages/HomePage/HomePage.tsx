import React from "react";
import PostCard from "../../Components/Post/PostCard";
import { Post } from "../../API";
import "./HomePage.css";
import { useStore } from "../../Store/PostStore";

const HomePage = () => {
  const { posts } = useStore();

  return (
    <div className="HomePage">
      {posts.map((item: Post | null) => {
        return <PostCard post={item} key={item?.id} />;
      })}
    </div>
  );
};

export default HomePage;
