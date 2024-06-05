import React, { useState } from "react";
import "animate.css";
import iconelink from "../../public/icone-link.svg";
import Button from "./Button";
import Image from "next/image";

export function Header(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <header className="w-full flex px-40 py-4 items-center justify-between text-white">
        <div className="flex gap-x-2">
          <Image
            src={iconelink}
            alt="icone Linkinho"
            height={56}
            width={56} // manter a proporção
            className={`animate__animated ${isHovered ? "animate__tada" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{props.name}</span>
            <span className="text-base">{props.content}</span>
          </div>
        </div>
        <div className="flex-row flex gap-x-2">
          <Button variant="primary"> Logar </Button>
          <Button variant="secondary"> Registrar </Button>
        </div>
      </header>
    </>
  );
}
