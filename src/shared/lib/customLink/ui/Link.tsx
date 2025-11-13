'use client';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export function Link({ href, children, className = '' }: LinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    window.history.pushState({}, '', href);
    const navigationEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navigationEvent);
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={handleClick}>
      {children}
    </div>
  );
}
