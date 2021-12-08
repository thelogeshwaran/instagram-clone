import React, { useEffect, useState } from "react";
import { useDataProvider } from "../../Context/DataContext";
import { Storage } from "aws-amplify";
import ProfileCard from "../ProfileCard/ProfileCard";

function ProfileHeader() {
  const { user, userProfile } = useDataProvider();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [ownProfile, setOwnProfile] = useState(false);

  useEffect(() => {
    userProfile?.imageUrl
      ? fetchUrl(userProfile.imageUrl!)
      : setUrl(
          "https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="
        );
  }, [userProfile?.imageUrl]);

  useEffect(() => {
    userProfile && user && user.id === userProfile?.id
      ? setOwnProfile(true)
      : setOwnProfile(false);
  }, [user, userProfile?.id, userProfile]);

  const fetchUrl = async (key: string) => {
    const url = await Storage.get(key);
    setUrl(url);
  };

  return (
    <ProfileCard
      open={open}
      setOpen={setOpen}
      url={url}
      ownProfile={ownProfile}
      username={user?.username!}
      about={user?.about!}
      postLength={user?.posts?.items?.length!}
    />
  );
}

export default ProfileHeader;
