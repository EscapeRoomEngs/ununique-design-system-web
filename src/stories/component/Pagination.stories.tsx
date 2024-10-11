import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "../../components/Pagination";
import "../globalStyles.css";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/Component/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PaginationExample: Story = {
  args: { currentPageIndex: 0, totalPageCnt: 60 },
  render: (args) => {
    const [page, setPage] = useState(args.currentPageIndex || 0);
    return (
      <Pagination
        currentPageIndex={page}
        totalPageCnt={args.totalPageCnt}
        onPageChange={(value) => setPage(value)}
      />
    );
  },
};
