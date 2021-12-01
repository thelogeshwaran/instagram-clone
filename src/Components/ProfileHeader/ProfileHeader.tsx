import React, { useEffect, useState } from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
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
    <div className={classes.profile_header}>
      <Badge
        className={classes.profile_image}
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
      <div className={classes.profile_description}>
        <div className={classes.profile_userEdit}>
          <h2 className={classes.profile_username}>{userProfile?.username}</h2>
          {ownProfile && (
            <IconButton onClick={handleOpen}>
              <SettingsIcon />
            </IconButton>
          )}
        </div>
        <div>
          <span className={classes.profile_count}>
            {userProfile?.posts?.items?.length}
          </span>
          posts
        </div>
        <div className={classes.profile_about}>{userProfile?.about}</div>
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

export default ProfileHeader;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profile_header: {
    display: "flex",
    justifyContent: "space-between",
    width: 500,
    margin: "0 auto",
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: " Arial, Helvetica, sans-serif",
  },
  profile_image: {
    margin: 5,
    marginRight: 50,
  },
  profile_description: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: 10,
  },
  profile_count: {
    fontWeight: "bold",
    margin: 10,
  },
  profile_username: {
    fontSize: 25,
    margin: 10,
  },
  profile_about: {
    margin: 10,
  },
  profile_userEdit: {
    display: "flex",
    alignItems: "center",
  },
}));
