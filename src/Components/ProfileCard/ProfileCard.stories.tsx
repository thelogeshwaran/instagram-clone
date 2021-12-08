import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProfileCard from "./ProfileCard";

export default {
  title: "Example/ProfileCard",
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const John = Template.bind({});
John.args = {
  username: "John",
  url: "https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551__480.jpg",
  postLength: 7,
  about: "I am from USA",
};

export const SampleUser = Template.bind({});
SampleUser.args = {
  username: "SampleUser",
};
