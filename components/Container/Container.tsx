import React, { ReactNode, FC } from "react";

type ContainerType = {
  children: ReactNode;
};

const Container: FC<ContainerType> = ({ children }) => {
  return <div className="py-16 px-12 lg:px-48 md:px-24 ">{children}</div>;
};
export default Container;
