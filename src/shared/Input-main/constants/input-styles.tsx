interface stylesOfType {
  [type: string]: {
    style: string;
  };
}
export const stylePurpose: stylesOfType = {
  FORM: {
    style: `rounded-md focus:outline-1  focus:outline-offset-6 mt-2 focus:invalid:outline-red-500/70`,
  },
  MESSAGE: { style: 'focus:outline-0 focus:border-0' },
};
