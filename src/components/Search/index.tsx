import { useId } from "react";
import style from "./style.module.scss";

type SearchBarProps = { onChange: (value: string) => void };

export default function SearchBar({ onChange }: SearchBarProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={style.container}>
      Search for user:
      <input
        id={id}
        type="search"
        name="name"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
