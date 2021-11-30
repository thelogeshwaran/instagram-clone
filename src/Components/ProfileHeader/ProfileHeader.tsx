import React, { useEffect, useState } from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import "./ProfileHeader.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import EditProfile from "../EditProfile/EditProfile";
import { useDataProvider } from "../../Context/DataContext";
import { Storage } from "aws-amplify";

function ProfileHeader() {
  const { user, userProfile } = useDataProvider();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [ownProfile, setOwnProfile] = useState(false);

  const classes = useStyles();

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="profile_header">
      <Badge
        className="profile_image"
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          style={{ height: "120px", width: "120px" }}
          alt="Travis Howard"
          src={url!}
        />
      </Badge>
      <div className="profile_description">
        <div className="profile_userEdit">
          <h2 className="profile_username">{userProfile?.username}</h2>
          {ownProfile && (
            <IconButton onClick={handleOpen}>
              <SettingsIcon />
            </IconButton>
          )}
        </div>
        <div className="profile_postsCount">
          <span className="profile_count">
            {userProfile?.posts?.items?.length}
          </span>
          posts
        </div>
        <div className="profile_about">{userProfile?.about}</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        className={classes.modal}
        aria-describedby="simple-modal-description"
      >
        <EditProfile setOpen={setOpen} />
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default ProfileHeader;
