interface stylesOfType {
  [type: string]: {
    style: string;
  };
}
export const stylePurpose: stylesOfType = {
  FORM: {
    style: 'rounded-md focus:outline-1 focus:outline-foreground/30 focus:outline-offset-6 mt-2',
  },
  MESSAGE: { style: 'focus:outline-0 focus:border-0' },
};
