export function MessageInputEdit({
  message,
  currentName,
}: {
  message: 'error' | 'base';
  currentName: string;
}) {
  return (
    <>
      {(message === 'error' && (
        <p className="text-sm text-red-500 opacity-80 w-full">
          Новое имя не должно повторять старое!
        </p>
      )) || (
        <p className="text-sm opacity-50 w-full">Текущее имя: {currentName}</p>
      )}
    </>
  );
}
