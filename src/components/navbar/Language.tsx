"use client";
import { language } from "@/assets";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Menu from "../menu/Menu";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import CheckBox from "../checkBox/CheckBox";
import { Globe } from 'lucide-react';
interface Props {
  lang: string;
}

const Language = ({ lang }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // ref
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const menuUserHandler = (e: any) => {
      if (
        !userButtonRef?.current?.contains(e.target) &&
        !userMenuRef?.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", menuUserHandler);

    return () => {
      document.removeEventListener("mousedown", menuUserHandler);
    };
  }, []);
  // language change
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookie("NEXT_LOCALE", event.target.value);
    router.refresh()
    setOpen(false)
  };
  return (
    <div className="relative">
      <button
        ref={userButtonRef}
        className="flex-c w-10 h-10 rounded-full bg-[#ABABAB21]"
        onClick={() => setOpen(!open)}
      >
        <Globe />
        {/* <Image src={language} alt="notification-icon" loading="lazy" /> */}
        
      </button>
      {open && (
        <Menu ref={userMenuRef} style="w-[311px]">
          <div className="p-4 border-b border-color">
            <CheckBox lang={lang} title="العربية" item="ar" onChange={onChange} />
          </div>
          <div className="p-4 mt-4">
            <CheckBox lang={lang} title="English" item="en" onChange={onChange} />
          </div>
        </Menu>
      )}
    </div>
  );
};

export default Language;
