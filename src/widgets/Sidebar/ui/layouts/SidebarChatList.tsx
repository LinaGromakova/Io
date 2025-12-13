import { useAuthState } from '@/features/auth/lib/hooks';
import { useAddUser } from '@/shared/api/store/lib/hooks';
import { useSearchActions } from '@/features/search/lib/hooks';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { ChatList } from '@/features/chat-list/ui';

export function SidebarChatList() {
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
            className="md:group-hover/sidebar:-translate-y-2 w-12 h-12 fixed z-30 text-xl translate-y-full
             bottom-0 max-md:left-auto max-md:bottom-14 max-md:right-3 left-[390px] max-lg:left-[43%]"
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
}
