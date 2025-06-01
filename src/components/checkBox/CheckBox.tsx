import "./style.css";
interface BoxProps {
  item: string;
  title: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lang: string | boolean;
}
const CheckBox = ({ item, onChange, title, lang }: BoxProps) => {
  return (
    <div className="checkbox-wrapper-46">
      <input
        value={item}
        className="inp-cbx"
        id={item}
        type="checkbox"
        onChange={onChange}
        checked={lang === item}
      />
      <label
        className="cbx flex flex-row-reverse items-center justify-between"
        htmlFor={item}
      >
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span className="title-color">{title}</span>
      </label>
    </div>
  );
};

export default CheckBox;
