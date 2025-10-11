import clsx from 'clsx';
import { UserContactListLayout } from '@/entities/UserContactsList/user-contacts-list-layout';
import { Header } from '../Header/header';
import { useGlobalContext } from '../Header/layouts/header-sidebar-layout';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';

interface ComponentProps {
  className?: string;
}
export function SidebarContactsLayout({ className }: ComponentProps) {
  const scroll: string = `[&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:transparent
  hover:[&::-webkit-scrollbar-thumb]:transparent
  [&::-webkit-scrollbar-thumb]:rounded-full`;

  const { sidebarIsOpen, addNewUsersOpen, setAddNewUsersOpen, setFilter } =
    useGlobalContext();
  return (
    <aside
      className={clsx(
        `overflow-y-scroll relative overflow-x-hidden h-screen group/sidebar
         max-md:w-full max-md:fixed bg-background z-50`,
        scroll,
        className,
        !sidebarIsOpen && 'max-md:hidden'
      )}
    >
      <Header type="SIDEBAR"></Header>
      {!addNewUsersOpen && (
        <ButtonCircle
          actionType="create"
          className="sm:group-hover/sidebar:-translate-y-4 w-12 h-12 fixed z-30 text-xl translate-y-full
        left-[28.2%] bottom-0 max-md:left-auto max-md:right-3 max-md:bottom-3 max-lg:left-[26.5%] min-2xl:left-[29.5%]"
          handlerClick={() => {
            setAddNewUsersOpen(true);
            setFilter('');
          }}
        ></ButtonCircle>
      )}

      <UserContactListLayout></UserContactListLayout>
    </aside>
  );
}
