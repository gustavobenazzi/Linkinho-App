import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-full flex-col justify-center px-40 h-[calc(100vh-88px)] items-center"> {children} </div>
  );
}
