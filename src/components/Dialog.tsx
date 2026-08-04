import { KeyboardEvent, MouseEvent, useEffect, useId, useRef } from "react";
import { Button, ButtonProps } from "./Button";
import { Body, Title } from "../atom/Text";

export interface DialogProps {
  title: string;
  messages: string;
  btns: ButtonProps[];
  open?: boolean;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
}

const focusableSelector = "button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

export const Dialog = ({ title, messages, btns = [{ text: "닫기" }], open = true, onClose, closeOnOverlayClick = true }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const messagesId = `${generatedId}-messages`;

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(focusableSelector);
    (firstFocusable ?? panelRef.current)?.focus();

    return () => previouslyFocusedRef.current?.focus();
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      if (onClose) {
        event.preventDefault();
        onClose();
      }
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    if (!focusable.length) {
      event.preventDefault();
      panelRef.current?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) onClose?.();
  };

  if (!open) return null;

  return <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={messagesId} className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4" onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
    <section ref={panelRef} tabIndex={-1} className="flex w-[400px] flex-col gap-6 rounded-2xl bg-uui-surface-primary p-4 pt-6">
      <Title id={titleId} fontStyle="Small">{title}</Title>
      <div id={messagesId} className="grid justify-center gap-0">{messages.split("\\n").map((line, index) => <Body fontColor="secondary" key={index}>{line}</Body>)}</div>
      <div className="flex gap-2">{btns.map((button, index) => <Button className="w-full" key={index} {...button} />)}</div>
    </section>
  </div>;
};
