import React, { useEffect, useState } from "react";
import ImageGrid from "../../Components/ImageGrid/ImageGrid";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import { getUser } from "../../graphql/queries";
import { GetUserQuery } from "../../API";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { User } from "../../API";
import { useParams } from "react-router";

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchUser(id!);
  }, [id]);

  async function fetchUser(userId: string) {
    try {
      const userdata = (await API.graphql(
        graphqlOperation(getUser, { id: userId })
      )) as GraphQLResult<GetUserQuery>;
      const fetchedUser = userdata.data?.getUser;
      setUser(fetchedUser!);
    } catch (err) {
      console.log("error fetching user: ", err);
    }
  }

  return (
    <div>
      <ProfileHeader user={user} />
      <ImageGrid user={user} />
    </div>
  );
}

export default ProfilePage;
