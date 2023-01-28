import React from "react";
import { Link } from "react-router-dom";

interface Props {
  onClick?: () => void;
  text: string;
  isLinkTag?: boolean;
  to?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const index: React.FC<Props> = ({
  onClick = (e: React.MouseEvent) => {},
  text,
  isLinkTag = false,
  to = "/",
  type='button'
}) => {
  if (isLinkTag) return <Link className="h-9 inline-block  bg-main transition-main cursor-pointer text-white leading-9 px-5 rounded-[18px] transition-main hover:bg-orange" onClick={onClick} to={to}>{text}</Link>;
  return <button type={type} className="h-9 inline-block  bg-main transition-main cursor-pointer text-white leading-9 px-5 rounded-[18px] transition-main hover:bg-orange"  onClick={onClick}>{text}</button>;
};

export default index;
