import Link from 'next/link';

type LinkConfig = {
  link: string;
  content: string;
};
type pageTypes = 'login' | 'register';

export function RedirectionLink({ page }: { page: 'login' | 'register' }) {
  const linkConfig: Record<pageTypes, LinkConfig> = {
    login: {
      link: '/register',
      content: 'Нет аккаунта? Зарегистрироваться!',
    },
    register: {
      link: '/login',
      content: 'Уже есть аккаунт? Войти!',
    },
  };

  return (
    <Link href={linkConfig[page].link}>
      <p className="mt-3 text-xs opacity-70 hover:opacity-100 hover:underline ml-2">
        {linkConfig[page].content}
      </p>
    </Link>
  );
}
