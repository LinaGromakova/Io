import { useState } from 'react';
import { BlackListLayout } from './layouts/sidebar-black-list';
import { SidebarOptions } from './layouts/sidebar-options';
import { clsx } from 'clsx';
import { useGlobalContext } from '@/features/common/globalContext';

export function SidebarOptionsLayout() {
  const [blackListIsOpen, setBlackListIsOpen] = useState(false);
  const { isOpen, sidebarIsOpen } = useGlobalContext();

  const scroll: string = `[&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:transparent
  hover:[&::-webkit-scrollbar-thumb]:transparent
  [&::-webkit-scrollbar-thumb]:rounded-full`;

  function blackListOpen() {
    setBlackListIsOpen(!blackListIsOpen);
  }
  return (
    <>
      <aside
        data-open={isOpen}
        className={clsx(
          `overflow-y-scroll fixed top-0 w-4/12 left-0 overflow-x-hidden h-screen border-r border-r-foreground/10 max-sm:w-full bg-background -z-10 max-md:w-8/12 opacity-0 duration-300`,
          scroll,
          !sidebarIsOpen && 'max-md:hidden'
        )}
      >
        {(blackListIsOpen && (
          <BlackListLayout
            id="12"
            name="dante"
            image="https://i.redd.it/dqtwi18nog5c1.jpg"
            handlerCloseBlackList={() => blackListOpen()}
          ></BlackListLayout>
        )) || (
          <SidebarOptions
            name="dante"
            image="https://i.redd.it/dqtwi18nog5c1.jpg"
            handlerBlackListOpen={() => blackListOpen()}
          ></SidebarOptions>
        )}
      </aside>
    </>
  );
}
