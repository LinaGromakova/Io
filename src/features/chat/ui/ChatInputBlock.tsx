export function ChatInputBlock({
  targetUserId,
  currentUserId,
}: {
  targetUserId: string | null;
  currentUserId: string | null;
}) {
  console.log('ChatInputBlock rendering');
  return (
    <div className="py-4 px-6 bg text-xl bg-extra absolute w-full text-center min-h-10 bottom-0 text-white">
      {targetUserId === currentUserId
        ? 'Пользователь добавил Вас в чёрный список'
        : 'Вы добавили пользователя в чёрный список'}
    </div>
  );
}
