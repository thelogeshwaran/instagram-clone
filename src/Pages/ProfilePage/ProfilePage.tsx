import React, { useEffect } from "react";
import ImageGrid from "../../Components/ImageGrid/ImageGrid";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import { getUser } from "../../graphql/queries";
import { GetUserQuery } from "../../API";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { useParams } from "react-router";
import { useDataProvider } from "../../Context/DataContext";

function ProfilePage() {
  const { id } = useParams();
  const { setUserProfile } = useDataProvider();

  useEffect(() => {
    fetchUser(id!);
  }, [id]);

  async function fetchUser(userId: string) {
    try {
      const userdata = (await API.graphql(
        graphqlOperation(getUser, { id: userId })
      )) as GraphQLResult<GetUserQuery>;
      const fetchedUser = userdata.data?.getUser;
      setUserProfile(fetchedUser!);
    } catch (err) {
      console.log("error fetching user: ", err);
    }
  }

  return (
    <div>
      <ProfileHeader />
      <ImageGrid />
    </div>
  );
}

export default ProfilePage;
