import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import ImageItem from "../ImageItem/ImageItem";

interface Props {
  keyword: string | null;
}

function PostImage({ keyword }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    keyword && fetchUrl(keyword);
  }, [keyword]);

  const fetchUrl = async (key: string) => {
    try {
      const url = await Storage.get(key);
      setImageUrl(url);
    } catch (e) {
      console.log(e);
    }
  };

  return <div>{imageUrl && <ImageItem url={imageUrl} />}</div>;
}

export default PostImage;
