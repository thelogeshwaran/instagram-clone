import React, { useEffect } from "react";
import ImageGrid from "../../Components/ImageGrid/ImageGrid";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import { useParams } from "react-router";
import { useStore } from "../../Store/PostStore";
import { useDataProvider } from "../../Context/DataContext";
import { makeStyles } from "@material-ui/core/styles";

function ProfilePage() {
  const classes = useStyles();
  const { id } = useParams();
  const { fetchUserProfile } = useStore();
  const { userProfile } = useDataProvider();

  useEffect(() => {
    if (id !== userProfile?.id) {
      fetchUserProfile(id!);
    }
  }, [id]);

  return (
    <div className={classes.profilePage}>
      <ProfileHeader />
      <ImageGrid />
    </div>
  );
}

export default ProfilePage;

const useStyles = makeStyles(() => ({
  profilePage: {
    minHeight: "90vh",
  },
}));
