import { useId } from "react";
import style from "./style.module.scss";

type SearchBarProps = { onChange: (value: string) => void; disabled?: boolean };

export default function SearchBar({ onChange, disabled }: SearchBarProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={style.container} data-disabled={disabled}>
      Search for user:
      <input
        id={id}
        type="search"
        name="name"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
