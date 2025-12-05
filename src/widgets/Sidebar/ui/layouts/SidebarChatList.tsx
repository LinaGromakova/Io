import { useAuthState } from '@/features/auth/lib/useAuthState';
import { ChatList } from '@/features/ChatList/ui/ChatList/ChatList';
import { useAddUser } from '@/features/interface-state/lib/hooks';
import { useSearchActions } from '@/features/search/lib/hooks';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';

export function SidebarChatList () {
  const { setFilter } = useSearchActions();
  const { isAddUserOpen, toggleAddUser } = useAddUser();
  const { user } = useAuthState();
  return (
    <>
      {!user || !user.userId ? (
        <></>
      ) : (
        !isAddUserOpen && (
          <ButtonCircle
            actionType="create"
            className="sm:group-hover/sidebar:-translate-y-2 w-12 h-12 fixed z-30 text-xl translate-y-full
             bottom-0 max-md:left-auto max-md:bottom-14 max-md:right-3 left-[390px] max-lg:left-[44%]"
            handlerClick={() => {
              toggleAddUser();
              setFilter('');
            }}
          ></ButtonCircle>
        )
      )}
      <ChatList></ChatList>
    </>
  );
};
