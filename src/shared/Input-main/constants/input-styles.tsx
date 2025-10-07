interface stylesOfType {
  [type: string]: {
    style: string;
  };
}
export const stylePurpose: stylesOfType = {
  FORM: {
    style: `rounded-md  focus:outline-1  focus:outline-offset-6 mt-2 focus:invalid:outline-red-500/70`,
  },
  FILTER: {
    style:
      'focus:outline-1 focus:outline-accent focus:text-accent focus:placeholder:text-accent duration-300 border-none ',
  },
  MESSAGE: {
    style:
      'border border-foreground/20 outline-none max-md:w-full max-md:rounded-none focus:border-foreground/50 ',
  },
};
