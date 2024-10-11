import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";

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
    <dialog ref={ref} onCancel={onClose}>
      {isValidElement(children)
        ? cloneElement(children, { onClose, open } as ModalProps)
        : children}
    </dialog>
  );
}
