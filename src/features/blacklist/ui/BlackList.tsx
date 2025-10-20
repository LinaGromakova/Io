import { UserContact } from '@/entities/UserContact';
import { useBlackList } from '../hooks/useBlackList';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useModalContext, useUiContext } from '@/features/common/contexts';
import { BlackListIsEmpty } from './BlackListIsEmpty';

export function BlackList() {
  const { user } = useAuth();
  const { blackListUsers, blackListLength } = useBlackList(user.userId);
  const { changeModalView } = useModalContext();
  const { toggleBubbleMenu } = useUiContext();
  return (
    <>
      {(blackListLength === 0 && (
        <BlackListIsEmpty></BlackListIsEmpty>
      )) || (
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
              changeModalView({
                modalType: 'unBlock',
                currentUserId: user.userId,
                targetUserId: u.userId,
                targetUserName: u.userName,
                chatId: '',
              })
            }
            onBubbleMenuOpen={() => toggleBubbleMenu}
          ></UserContact>
        );
      })}
    </>
  );
}
