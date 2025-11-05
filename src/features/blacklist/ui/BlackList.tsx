import { UserContact } from '@/entities/UserContact';
import { useBlackList } from '../hooks/useBlackList';
import { BlackListIsEmpty } from './BlackListIsEmpty';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { useModalControls } from '@/features/modal/lib/useModalState';
import { useUiActions } from '@/features/interface-state/lib/hooks';

export function BlackList() {
  const { user } = useAuthState();
  const { blackListUsers, blackListLength } = useBlackList(user.userId);
  const { openModal } = useModalControls();
  const { toggleBubbleMenu } = useUiActions();
  return (
    <>
      {(blackListLength === 0 && <BlackListIsEmpty></BlackListIsEmpty>) || (
        <h4 className="text-center my-5 opacity-65">
          {blackListLength} заблокированных пользователей
        </h4>
      )}
      {blackListUsers.map((u) => {
        return (
          <UserContact
            key={u.userId}
            type="simple"
            currentUserId={user.userId}
            targetUserId={u.userId}
            userName={u.userName}
            userImage={u.userImage}
            menuType="contactSimpleInBlock"
            unBlockUser={() =>
              openModal({
                modalType: 'unBlock',
                currentUserId: user.userId,
                targetUserId: u.userId,
                targetUserName: u.userName,
                chatId: '',
              })
            }
            onBubbleMenuOpen={toggleBubbleMenu}
          ></UserContact>
        );
      })}
    </>
  );
}
