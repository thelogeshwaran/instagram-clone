import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ImageUploader from "../ImageUploader/ImageUploader";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import Auth from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../Context/DataContext";
import { MaterialIconButton } from "../MaterialIconButton/MaterialIconButton";

const Header: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { user } = useDataProvider();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    user && setUserId(user.id);
  }, [user]);

  const logout = async () => {
    try {
      await Auth.signOut();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.app_header}>
      <img
        className={classes.app_headerImage}
        src="https://pngimage.net/wp-content/uploads/2018/06/font-instagram-png-2.png"
        alt="Instagram"
      ></img>
      <div>
        <Link to="/">
          <MaterialIconButton
            children={<HomeIcon />}
            color={undefined}
            size="medium"
          />
        </Link>

        <MaterialIconButton
          children={<AddBoxOutlinedIcon />}
          color={undefined}
          size="medium"
          onClick={handleOpen}
        />

        <Link to={`/profile/${userId}`}>
          <MaterialIconButton
            children={<AccountCircleIcon />}
            color={undefined}
            size="medium"
          />
        </Link>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <ImageUploader setOpen={setOpen} />
          </Fade>
        </Modal>

        <MaterialIconButton
          children={<ExitToAppIcon />}
          color={undefined}
          size="medium"
          onClick={logout}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  app_header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "10vh",
    borderBottom: "1px solid black",
    backgroundColor: "white",
    position: "sticky",
    top: 0,
    zIndex: 3,
  },
  app_headerImage: {
    height: "60%",
    margin: " 2%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default Header;
