import { logo } from "@/assets";
import Image from "next/image";
import IconsAction from "./IconsAction";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="container">
        <div className="flex w-full items-center justify-between md:gap-6 lg:gap-8 xl:gap-12">
          <Link href={"/"} className="w-[100px] lg:w-[150px] xl:w-[200px]">
            <Image src={logo} alt="logo" priority />
          </Link>
          <div>
            <IconsAction />
          </div> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
