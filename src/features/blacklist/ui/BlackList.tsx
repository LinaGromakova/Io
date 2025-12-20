import { UserContact } from '@/entities/user-contact/ui';
import { useBlackList } from '../lib/hooks';
import { BlackListIsEmpty } from './BlackListIsEmpty';
import { useAuthState } from '@/features/auth/lib/hooks';
import { useModalControls } from '@/features/confirmation/lib/use-modal-state';
import { useUiActions } from '@/shared/api/store/lib/hooks';
import { UserShortInterface } from '@/shared/types/domain';
import { BlackListLoading } from './BlackListLoading';

export function BlackList() {
  const { user } = useAuthState();
  const { blackListUsers, blackListLength } = useBlackList(user?.userId || '');
  const { openModal } = useModalControls();
  const { toggleBubbleMenu } = useUiActions();

  if (!blackListUsers) {
    return <BlackListLoading></BlackListLoading>;
  } else
    return (
      <>
        {(blackListLength === 0 && <BlackListIsEmpty></BlackListIsEmpty>) || (
          <h4 className="text-center my-5 opacity-65">
            {blackListLength} заблокированных пользователей
          </h4>
        )}
        {blackListUsers.map((u: UserShortInterface) => {
          return (
            <UserContact
              key={u.userId}
              type="simple"
              currentUserId={user?.userId || ''}
              targetUserId={u.userId}
              userName={u.userName}
              userImage={u.userImage}
              menuType="contactSimpleInBlock"
              onMenuAction={() => {
                openModal({
                  modalType: 'unBlock',
                  currentUserId: user?.userId,
                  targetUserId: u.userId,
                  targetUserName: u.userName,
                  chatId: '',
                });
              }}
              onBubbleMenuOpen={() => toggleBubbleMenu}
            ></UserContact>
          );
        })}
      </>
    );
}
