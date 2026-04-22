import { useEffect } from "react";
import "./ConfirmModal.css";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-modal" onClick={onCancel}>
      <div className="confirm-modal__backdrop" />

      <div
        className="confirm-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="confirm-modal__close"
          onClick={onCancel}
        >
          ×
        </button>

        <h2 className="confirm-modal__title">{title}</h2>

        <p className="confirm-modal__description">{description}</p>

        <div className="confirm-modal__actions">
          <button
            type="button"
            className="confirm-modal__button confirm-modal__button--secondary"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="confirm-modal__button confirm-modal__button--primary"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
