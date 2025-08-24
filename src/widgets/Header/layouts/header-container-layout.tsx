interface Props {
  children: React.ReactNode;
}
export function HeaderContainerLayout({ children }: Props) {
  return (
    <header className="flex items-center px-4 py-2 w-full bg-background">
      {children}
    </header>
  );
}
