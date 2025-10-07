interface Props {
  children: React.ReactNode;
  className: string;
}
export function HeaderContainerLayout({ children, className }: Props) {
  return (
    <header className={`flex items-center px-4 py-2 w-full ${className}`}>
      {children}
    </header>
  );
}
