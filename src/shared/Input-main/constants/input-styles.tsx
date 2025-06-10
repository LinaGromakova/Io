interface stylesOfType {
  [type: string]: {
    style: string;
  };
}
export const stylePurpose: stylesOfType = {
  FORM: {
    style: 'rounded-md focus:outline-1 focus:outline-cyan-50/25 focus:outline-offset-6',
  },
  MESSAGE: { style: '' },
};
