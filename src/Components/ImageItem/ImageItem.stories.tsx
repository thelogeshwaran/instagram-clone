import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ImageItem from "./ImageItem";

export default {
  title: "Example/ImageItem",
  component: ImageItem,
} as ComponentMeta<typeof ImageItem>;

const Template: ComponentStory<typeof ImageItem> = (args) => (
  <ImageItem {...args} />
);

export const Large = Template.bind({});
Large.args = {
  size: "large",
  url: "https://cdn.pixabay.com/photo/2015/05/31/11/16/dinner-791142__480.jpg",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
  url: "https://cdn.pixabay.com/photo/2015/05/31/11/16/dinner-791142__480.jpg",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  url: "https://cdn.pixabay.com/photo/2015/05/31/11/16/dinner-791142__480.jpg",
};

export const Custom = Template.bind({});
Custom.args = {
  height: 400,
  width: 300,
  url: "https://cdn.pixabay.com/photo/2015/05/31/11/16/dinner-791142__480.jpg",
};
