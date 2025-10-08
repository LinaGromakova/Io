import Login from '../../../public/auth-icons/Login.svg';
import Register from '../../../public/auth-icons/Register.svg';
interface TitleProps {
  title: string;
}

export function MainTitle(props: TitleProps) {
  return (
    <h1>
      {props.title === 'login' ? (
        <Login className="w-full h-30 mt-2 mb-6" />
      ) : (
        <Register className="w-full h-28 mb-4 -mt-2 px-16" />
      )}
    </h1>
  );
}
