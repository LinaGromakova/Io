import { ChatList } from '@/features/ChatList/ui/ChatList/ChatList';
import { useSearchContext } from '@/features/common/contexts';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { memo } from 'react';

export const SidebarChatList = memo(function SidebarChatList(props) {
  const { setFilter } = useSearchContext();
  return (
    <>
      {!props.isAddUserOpen && (
        <ButtonCircle
          actionType="create"
          className="sm:group-hover/sidebar:-translate-y-4 w-12 h-12 fixed z-30 text-xl translate-y-full
            left-[28.2%] bottom-0 max-md:left-auto max-md:right-3 max-md:bottom-3 max-lg:left-[26.5%] min-2xl:left-[29.5%]"
          handlerClick={() => {
            props.setIsAddUserOpen(true);
            setFilter('');
          }}
        ></ButtonCircle>
      )}
      <ChatList></ChatList>
    </>
  );
});
