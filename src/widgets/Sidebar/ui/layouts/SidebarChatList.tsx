import { ChatList } from '@/features/ChatList/ui/ChatList/ChatList';
import { useAddUser } from '@/features/interface-state/lib/hooks';

import { useSearchActions } from '@/features/search/lib/hooks';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { memo } from 'react';

export const SidebarChatList = memo(function SidebarChatList(props) {
  const { setFilter } = useSearchActions();
  const { isAddUserOpen, toggleAddUser } = useAddUser();
  return (
    <>
      {!isAddUserOpen && (
        <ButtonCircle
          actionType="create"
          className="sm:group-hover/sidebar:-translate-y-4 w-12 h-12 fixed z-30 text-xl translate-y-full
            left-[20.5%] bottom-0 max-md:left-auto max-md:right-3 max-md:bottom-3 max-lg:left-[20.5%] min-2xl:left-[21%]"
          handlerClick={() => {
            toggleAddUser();
            setFilter('');
          }}
        ></ButtonCircle>
      )}
      <ChatList></ChatList>
    </>
  );
});
