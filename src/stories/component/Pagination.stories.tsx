import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import type { PaginationProps } from "../../components/Pagination";

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
