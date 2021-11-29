import React from "react";
import PostCard from "../../Components/Post/PostCard";
import { useDataProvider } from "../../Context/DataContext";
import { Post } from "../../API";
import "./HomePage.css";

const HomePage = () => {
  const { posts } = useDataProvider();
  return (
    <div className="HomePage">
      {posts.map((item: Post) => {
        return <PostCard post={item} key={item.id} />;
      })}
    </div>
  );
};

export default HomePage;
