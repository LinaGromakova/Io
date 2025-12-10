interface CustomTitleProps {
  title: 'login' | 'register';
}

export function CustomTitle({ title }: CustomTitleProps) {
  return (
    <h1
      className="h-auto mt-2 mb-6 custom-title text-8xl text-center bg-clip-text text-transparent capitalize leading-32
     bg-gradient-to-t from-accent to-accent-shadow"
    >
      {title}
    </h1>
  );
}
