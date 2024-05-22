export const spacing = {
  10: "56px",
  9: "40px",
  8: "32px",
  7: "24px",
  6: "20px",
  5: "16px",
  4: "12px",
  3: "8px",
  2: "4px",
  1: "2px",
  0: "0px",
};

export const layout = {
  flex: (obj: object | any) => `
      dispaly: flex;
      flex-direction: ${obj?.direction ?? "column"};
      justify-content: ${obj?.justify ?? "center"}; 
      align-items: ${obj?.align ?? "center"}; 
      gap: ${obj?.spacing ?? "16px"};
    `,
  grid: (obj: object | any) => `
      dispaly: grid;
      justify-content: ${obj?.justify ?? "center"}; 
      align-items: ${obj?.align ?? "center"}; 
      gap: ${obj?.spacing ?? "16px"};
    `,
};
