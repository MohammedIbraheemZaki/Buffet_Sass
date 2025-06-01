import { cn } from "@/lib/utils";
import "./style.css";
interface Props {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
  style?: string;
}

const Menu = ({ children, ref, style }: Props) => {
  return (
    <div
      className={cn(`absolute p-4 pb-[10px] mainMenu z-40 ${style}`)}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Menu;
