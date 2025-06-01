
import React from "react";

import Language from "./Language";

import { getLocale } from "next-intl/server";
import Link from "next/link";


const IconsAction = async () => {
  const lang = await getLocale();

  return (
    <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
      <Link href="/auth/login">Login</Link>
      <Link href="/profile">Profile</Link>
      <Language lang={lang} />
    </div>
  );
};

export default IconsAction;
