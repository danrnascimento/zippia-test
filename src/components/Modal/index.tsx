import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import style from "./style.module.scss";

type ModalProps = PropsWithChildren<{ open: boolean; onClose: () => void }>;

export default function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog className={style.container} ref={ref} onCancel={onClose}>
      <button className={style.close} onClick={onClose}>
        ❌
      </button>

      {isValidElement(children)
        ? cloneElement(children, { onClose, open } as ModalProps)
        : children}
    </dialog>
  );
}
