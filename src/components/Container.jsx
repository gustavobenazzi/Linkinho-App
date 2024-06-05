import React from "react";

export default function Container({ children }) {
  return (
    <div className="w-full flex-col justify-center px-40 h-[calc(100vh-88px)] items-center"> {children} </div>
  );
}
