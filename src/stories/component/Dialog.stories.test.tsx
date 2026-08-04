import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as stories from "./Dialog.stories";

const { BrandThemeParity } = composeStories(stories);

describe("Dialog stories", () => {
  it("drives themed dialog content and close callbacks from story args", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <BrandThemeParity
        open={false}
        onClose={onClose}
        title="제어된 테마 제목"
        messages="제어된 테마 내용"
        btns={[{ text: "제어된 닫기", property: "brand" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "red 다이얼로그 열기" }));

    expect(screen.getByRole("dialog", { name: "제어된 테마 제목" })).toBeInTheDocument();
    expect(screen.getByText("제어된 테마 내용")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "제어된 닫기" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("synchronizes both themed dialog previews with the open control", () => {
    const args = {
      onClose: vi.fn(),
      title: "동기화 제목",
      messages: "동기화 내용",
      btns: [{ text: "닫기", property: "brand" as const }],
    };
    const { rerender } = render(<BrandThemeParity {...args} open={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(<BrandThemeParity {...args} open />);
    expect(screen.getAllByRole("dialog", { name: "동기화 제목" })).toHaveLength(2);

    rerender(<BrandThemeParity {...args} open={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
