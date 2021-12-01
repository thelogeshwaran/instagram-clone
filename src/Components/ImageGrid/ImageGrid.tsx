import React, { useEffect, useState } from "react";
import ImageItem from "../ImageItem/ImageItem";
import "./ImageGrid.css";
import { Post } from "../../API";
import { useDataProvider } from "../../Context/DataContext";

function ImageGrid() {
  const [posts, setPosts] = useState<(Post | null)[]>([]);
  const { userProfile } = useDataProvider();

  useEffect(() => {
    userProfile?.posts?.items && setPosts(userProfile?.posts?.items!);
  }, [userProfile]);

  return (
    <div className="imageGrid">
      {posts.map((item: Post | null) => {
        return <ImageItem key={item?.id} url={item?.imageUrl!} />;
      })}
    </div>
  );
}

export default ImageGrid;
