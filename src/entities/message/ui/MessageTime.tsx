import { parseValidDate } from '@/shared/lib/dates/parse-valid-date';

export function MessageTime({ createdAt }: { createdAt: Date }) {
  const time = parseValidDate(createdAt);
  return <span className="text-xs opacity-70">{time}</span>;
}
