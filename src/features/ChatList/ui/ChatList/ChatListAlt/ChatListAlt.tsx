import { GiAstronautHelmet as AstronautIcon } from 'react-icons/gi';

export function ChatListAlt({
  icon,
  text,
  link,
}: {
  text: string;
  icon?: boolean;
  link?: { onClick: () => void; linkText: string };
}) {
  console.log('ChatListAlt rendering');
  return (
    <div className="flex flex-col items-center justify-center h-9/12 text-base">
      {icon && (
        <AstronautIcon className="mb-4 text-[200px] opacity-30"></AstronautIcon>
      )}
      <p className="mb-4 opacity-65 text-xl">{text}</p>
      {link && (
        <p
          className="opacity-65 hover:opacity-100 underline cursor-pointer"
          onClick={() => link.onClick()}
        >
          {text}
        </p>
      )}
    </div>
  );
}
