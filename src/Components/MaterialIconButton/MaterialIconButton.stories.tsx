import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MaterialIconButton } from "./MaterialIconButton";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";

export default {
  title: "Example/MaterialIconButton",
  component: MaterialIconButton,
} as ComponentMeta<typeof MaterialIconButton>;

const Template: ComponentStory<typeof MaterialIconButton> = (args) => (
  <MaterialIconButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  color: "primary",
  size: "small",
  children: <AccessAlarmsIcon />,
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
  size: "small",
  children: <AccessAlarmsIcon />,
};

export const Small = Template.bind({});
Small.args = {
  color: "secondary",
  size: "small",
  children: <AccessAlarmsIcon />,
};
export const Medium = Template.bind({});
Medium.args = {
  color: "secondary",
  size: "medium",
  children: <AccessAlarmsIcon />,
};
export const Disabled = Template.bind({});
Disabled.args = {
  color: "secondary",
  size: "medium",
  disabled: true,
  children: <AccessAlarmsIcon />,
};
