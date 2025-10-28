import Login from '@/shared/assets/authIcons/Login.svg';
import Register from '@/shared/assets/authIcons/Register.svg';

interface CustomTitleProps {
  title: 'login' | 'register';
}

export function CustomTitle({ title }: CustomTitleProps) {
  return (
    <h1>
      {title === 'login' ? (
        <Login className="w-full h-30 mt-2 mb-6" />
      ) : (
        <Register className="w-full h-28 mb-4 -mt-2 px-16" />
      )}
    </h1>
  );
}
