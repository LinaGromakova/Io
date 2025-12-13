import { CheckMarkIcon } from '@/shared/assets/icons';

interface InterfaceButtonSaveNewName {
  value: string;
  handlerSave: React.Dispatch<React.SetStateAction<string>>;
}
export function ButtonSaveNewName({
  value,
  handlerSave,
}: InterfaceButtonSaveNewName) {
  return (
    <button
      type="button"
      className="ml-1 w-8 h-8 absolute -right-15 cursor-pointer"
      onClick={() => {
        if (!value) {
          return;
        }
        handlerSave(value);
      }}
    >
      <CheckMarkIcon className="text-foreground/50 hover:text-foreground/80 text-4xl duration-300"></CheckMarkIcon>
    </button>
  );
}
