import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import "./ProfileHeader.css";
import { User } from "../../API";

interface Props {
  user: User | null;
}

function ProfileHeader({ user }: Props) {
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
          src={
            user?.imageUrl
              ? user?.imageUrl
              : "https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="
          }
        />
      </Badge>
      <div className="profile_description">
        <h2 className="profile_username">{user?.username}</h2>
        <div className="profile_postsCount">
          <span className="profile_count">{user?.posts?.items?.length}</span>
          posts
        </div>
        <div className="profile_about">{user?.about}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
