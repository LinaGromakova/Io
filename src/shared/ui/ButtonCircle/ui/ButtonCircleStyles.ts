export const ButtonCircleStylesBasic = `duration-300 cursor-pointer flex justify-center items-center 
    font-bold rounded-full h-9 w-9 text-xl overflow-hidden hover:bg-inter`;

//bg-inter/50 проверь
export const ButtonCircleStylesByTypes = {
  message:
    'border border-foreground/20 w-10 h-10 min-h-10 min-w-10 bg-inter hover:text-foreground/80 hover:border-foreground/50',
  create:
    'bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% text-white hover:scale-105',
  search: '',
  back: '',
  options: '',
  photoAdd: '',
  more: '',
};
