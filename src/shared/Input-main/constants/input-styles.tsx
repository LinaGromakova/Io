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
      'focus:outline-2 focus:outline-accent focus:text-accent focus:placeholder:text-accent duration-300',
  },
  MESSAGE: {
    style: 'border-none outline-none max-md:w-full max-md:rounded-none',
  },
};
