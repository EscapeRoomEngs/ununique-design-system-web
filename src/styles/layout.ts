import { layout } from "../foundation/layout";

export const LAYOUT = `
  /* Layout */
  .grid { ${layout.grid({})} }
  .flex-center { ${layout.flex({})} }
  .flex-sides { ${layout.flex({ justify: "space-between" })} }
  .flex-left { ${layout.flex({ justify: "flex-start" })} }
  .flex-right { ${layout.flex({ justify: "flex-end" })} }
  .flex-upper-lower { ${layout.flex({ justify: "space-between", align: "space-between", direction: "column" })} }
  .layout-upper {
    alight-items: start;
  }
  .layout-lower {
    alight-items: end;
  }
  .layout-sides {
    alight-items: space-between;
  }
`;
