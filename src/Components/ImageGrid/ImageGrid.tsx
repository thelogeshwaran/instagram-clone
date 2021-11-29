import React, { useEffect, useState } from "react";
import ImageItem from "../ImageItem/ImageItem";
import "./ImageGrid.css";
import { User, Post } from "../../API";

interface Props {
  user: User | null;
}

function ImageGrid({ user }: Props) {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    user?.posts && setPosts(user?.posts.items!);
  }, [user]);

  return (
    <div className="imageGrid">
      {posts.map((item: Post) => {
        return <ImageItem key={item.id} url={item.imageUrl!} />;
      })}
    </div>
  );
}

export default ImageGrid;
