import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import EditProfileCard from "./EditProfileCard";

export default {
  title: "Example/EditProfileCard",
  component: EditProfileCard,
} as ComponentMeta<typeof EditProfileCard>;

const Template: ComponentStory<typeof EditProfileCard> = (args) => (
  <EditProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
};

export const Active = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
