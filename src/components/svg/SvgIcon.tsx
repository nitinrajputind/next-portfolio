// SvgIcon.tsx
import React, { SVGProps } from "react";

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  name: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  width = "24px",
  height = "24px",
  fill = "#000",
  className,
  ...props
}) => {
  const SvgComponent = require(`../../assets/icons/${name}.svg`).default;

  return (
    <SvgComponent
      width={width}
      height={height}
      fill={fill}
      className={className}
      {...props}
    />
  );
};

export default SvgIcon;
