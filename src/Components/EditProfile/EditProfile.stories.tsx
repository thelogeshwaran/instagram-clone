import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import EditProfile from "./EditProfile";

export default {
  title: "Example/EditProfile",
  component: EditProfile,
} as ComponentMeta<typeof EditProfile>;

const Template: ComponentStory<typeof EditProfile> = (args) => (
  <EditProfile {...args} />
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
