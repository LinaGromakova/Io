import {
  IoCheckmarkDoneOutline as MarkDoneIcon,
  IoCheckmarkOutline as MarkOutlineIcon,
} from 'react-icons/io5';

export function MessageStatus({ isRead }: { isRead: boolean }) {
  return (
    <span className="align-text-bottom mx-1">
      {(isRead && <MarkDoneIcon></MarkDoneIcon>) || (
        <MarkOutlineIcon className="opacity-70"></MarkOutlineIcon>
      )}
    </span>
  );
}
