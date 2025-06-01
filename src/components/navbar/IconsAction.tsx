
import React from "react";

import Language from "./Language";

import { getLocale } from "next-intl/server";


const IconsAction = async () => {
  const lang = await getLocale();

  return (
    <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
      <Language lang={lang} />
    </div>
  );
};

export default IconsAction;
