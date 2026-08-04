import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import { Body } from "../../atom/Text";
import type { PaginationProps } from "../../components/Pagination";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { userEvent } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Pagination> = {
  title: "Design System/Component/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledPagination(args: PaginationProps) {
  const [page, setPage] = useState(args.currentPageIndex ?? 0);

  useEffect(() => setPage(args.currentPageIndex ?? 0), [args.currentPageIndex]);

  return <Pagination {...args} currentPageIndex={page} onPageChange={setPage} />;
}

export const PaginationExample: Story = {
  args: { currentPageIndex: 0, totalPageCnt: 60 },
  render: (args) => <ControlledPagination {...args} />,
};

export const FirstPage: Story = {
  args: { currentPageIndex: 0, totalPageCnt: 5 },
};

export const LastPage: Story = {
  args: { currentPageIndex: 4, totalPageCnt: 5 },
};

export const BrandThemeParity: Story = {
  render: () => (
    <div className="grid gap-6">
      {(["red", "orange"] as const).map((theme) => (
        <ThemeProvider key={theme} theme={theme} className="grid gap-2">
          <Body fontColor="brand">{theme} pagination focus</Body>
          <ControlledPagination currentPageIndex={1} totalPageCnt={5} />
        </ThemeProvider>
      ))}
    </div>
  ),
};

export const KeyboardFocus: Story = {
  args: { currentPageIndex: 0, totalPageCnt: 5 },
  play: async () => {
    await userEvent.tab();
  },
};
