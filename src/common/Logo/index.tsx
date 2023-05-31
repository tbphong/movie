import React from "react";
import { Link } from "react-router-dom";

interface logoProps {
  className?: string;
  logoColor?: string;
}

const Logo: React.FC<logoProps> = ({
  className = "",
  logoColor = "text-black dark:text-primary",
}) => (
  <Link
    to="/"
    className={`flex flex-row items-center xs:gap-2 gap-[6px] ${className}`}
  >
    <span className={`font-semibold sm:text-[18px] text-[16.75px] ${logoColor} `}>
      Movies
    </span>
  </Link>
);

export default Logo;
