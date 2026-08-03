import { Button, ButtonProps } from "./Button";
import { Body, Title } from "../atom/Text";

export interface DialogProps { title: string; messages: string; btns: ButtonProps[] }
export const Dialog = ({ title, messages, btns = [{ text: "닫기" }] }: DialogProps) => (
  <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
    <section className="flex w-[400px] flex-col gap-6 rounded-2xl bg-uui-surface-primary p-4 pt-6">
      <Title fontStyle="Small">{title}</Title>
      <div className="grid justify-center gap-0">{messages.split("\\n").map((line, index) => <Body fontColor="secondary" key={index}>{line}</Body>)}</div>
      <div className="flex gap-2">{btns.map((button, index) => <Button className="w-full" key={index} {...button} />)}</div>
    </section>
  </div>
);
