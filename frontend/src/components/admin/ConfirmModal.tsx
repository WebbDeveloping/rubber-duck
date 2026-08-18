import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';

type ConfirmModalProps = {
  open: boolean;
  title: string;
  kicker?: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirming?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
};

export function ConfirmModal({
  open,
  title,
  kicker,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirming = false,
  error,
  onConfirm,
  onCancel,
  children,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      cancelRef.current?.focus();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onDialogCancel(event: Event) {
      event.preventDefault();
      if (!confirming) onCancel();
    }

    dialog.addEventListener('cancel', onDialogCancel);
    return () => dialog.removeEventListener('cancel', onDialogCancel);
  }, [confirming, onCancel]);

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current && !confirming) {
      onCancel();
    }
  }

  return (
    <dialog ref={dialogRef} className="ops-modal" aria-labelledby="ops-modal-title" onClick={onBackdropClick}>
      {children && <div className="ops-modal-visual">{children}</div>}

      <div className="ops-modal-body">
        {kicker && <p className="ops-kicker">{kicker}</p>}
        <h2 id="ops-modal-title" className="ops-modal-title">
          {title}
        </h2>
        <div className="ops-modal-copy">{description}</div>

        {error && <p className="ops-banner is-error">{error}</p>}

        <div className="ops-modal-actions">
          <button
            ref={cancelRef}
            type="button"
            className="ops-btn ops-btn--ghost"
            disabled={confirming}
            onClick={onCancel}
          >
            <span className="text-slide">
              <span data-label={cancelLabel}>{cancelLabel}</span>
            </span>
          </button>
          <button
            type="button"
            className="ops-btn ops-btn--danger"
            disabled={confirming}
            onClick={onConfirm}
          >
            <span className="text-slide">
              <span data-label={confirming ? 'Deleting…' : confirmLabel}>
                {confirming ? 'Deleting…' : confirmLabel}
              </span>
            </span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
