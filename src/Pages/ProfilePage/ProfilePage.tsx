import React, { useEffect } from "react";
import ImageGrid from "../../Components/ImageGrid/ImageGrid";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import { useParams } from "react-router";
import { useStore } from "../../Store/PostStore";
import { useDataProvider } from "../../Context/DataContext";

function ProfilePage() {
  const { id } = useParams();
  const { fetchUserProfile } = useStore();
  const { userProfile } = useDataProvider();

  useEffect(() => {
    if (id !== userProfile?.id) {
      fetchUserProfile(id!);
    }
  }, [id]);

  return (
    <div>
      <ProfileHeader />
      <ImageGrid />
    </div>
  );
}

export default ProfilePage;
