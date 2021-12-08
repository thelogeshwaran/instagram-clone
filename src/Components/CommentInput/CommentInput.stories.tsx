import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CommentInput from "./CommentInput";

export default {
  title: "Example/CommentInput",
  component: CommentInput,
} as ComponentMeta<typeof CommentInput>;

const Template: ComponentStory<typeof CommentInput> = (args) => (
  <CommentInput {...args} />
);

export const Active = Template.bind({});
Active.args = {
  disabled: false,
  label: "Enter a Comment",
  width: 400,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: "Enter a Text",
  width: 500,
};
