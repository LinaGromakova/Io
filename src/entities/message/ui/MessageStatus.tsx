import { MarkDoneIcon, MarkOutlineIcon } from '@/shared/assets/icons';

export function MessageStatus({ isRead }: { isRead: boolean }) {
  return (
    <span className="align-text-bottom mx-1">
      {(isRead && <MarkDoneIcon></MarkDoneIcon>) || (
        <MarkOutlineIcon className="opacity-70"></MarkOutlineIcon>
      )}
    </span>
  );
}
