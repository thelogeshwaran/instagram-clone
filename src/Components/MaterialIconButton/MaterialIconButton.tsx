import { IconButton } from "@material-ui/core";
import React from "react";

interface ButtonProps {
  color: "inherit" | "primary" | "secondary" | "default" | undefined;
  size: "medium" | "small";
  disabled?: boolean;
  onClick?: () => void;
  children: JSX.Element;
}

export const MaterialIconButton = ({
  color,
  size,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <IconButton color={color} size={size} disabled={disabled} {...props}>
      {children}
    </IconButton>
  );
};
