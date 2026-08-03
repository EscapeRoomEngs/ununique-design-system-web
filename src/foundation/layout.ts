export const spacing = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 56];

export const radius = [0, 4, 8, 12, 16];

type LayoutOptions = { direction?: string; justify?: string; align?: string; spacing?: number };

export const layout = {
  flex: (obj: LayoutOptions = {}) => `
      display: flex;
      flex-direction: ${obj?.direction ?? "row"};
      justify-content: ${obj?.justify ?? "center"}; 
      align-items: ${obj?.align ?? "center"}; 
      gap: ${obj?.spacing ?? 16}px;
      `,
  grid: (obj: LayoutOptions = {}) => `
      display: grid;
      justify-content: ${obj?.justify ?? "center"}; 
      align-items: ${obj?.align ?? "center"}; 
      gap: ${obj?.spacing ?? 16}px;
    `,
};
