import React, { useEffect, useState } from "react";
import "./ImageItem.css";
import { Storage } from "aws-amplify";

interface Props {
  url: string | null;
}

function ImageItem({ url }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchUrl(url!);
  }, [url]);

  const fetchUrl = async (key: string) => {
    const url = await Storage.get(key);
    setImageUrl(url);
  };

  return (
    <div className="imageItem">
      <img className="imageItem_item" src={imageUrl!} alt="posts"></img>
    </div>
  );
}

export default ImageItem;
