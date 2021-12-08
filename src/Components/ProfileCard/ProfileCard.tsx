import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "@material-ui/core/Modal";
import EditProfile from "../EditProfile/EditProfile";
import { makeStyles } from "@material-ui/core/styles";
import { MaterialIconButton } from "../MaterialIconButton/MaterialIconButton";

interface Props {
  open: boolean;
  ownProfile?: boolean;
  username: string;
  postLength?: number;
  about?: string;
  url?: string | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileCard({
  setOpen,
  open,
  ownProfile,
  username,
  postLength,
  url,
  about,
}: Props) {
  const classes = useStyles();

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
          <h2 className={classes.profile_username}>
            {username ? username : "username"}
          </h2>
          {ownProfile && (
            <MaterialIconButton
              children={<SettingsIcon />}
              color={undefined}
              size="medium"
              onClick={handleOpen}
            />
          )}
        </div>
        <div>
          <span className={classes.profile_count}>
            {postLength ? postLength : "0"}
          </span>
          posts
        </div>
        <div className={classes.profile_about}>{about ? about : "about"}</div>
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

export default ProfileCard;

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
