import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { UserContactSimpleLayout } from '@/entities/UserContact/layouts/user-contact-simple';
import { useGlobalContext } from '@/features/common/globalContext';
import { useEffect, useState } from 'react';

interface BlackListLayoutProps {
  handlerCloseBlackList: () => void;
}
interface UserBlacklistInterface {
  id: string;
  name: string;
  image: string;
}
async function getBlackListUsers(user_id: string) {
  try {
    const data = await fetch(`http://localhost:5000/blacklist/${user_id}`);
    const result = await data.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error, 'error');
  }
}

export function BlackListLayout(props: BlackListLayoutProps) {
  const { changeModalView, user, isModalOpen } = useGlobalContext();
  const [blacklistUsers, setBlackListUsers] = useState([]);
  useEffect(() => {
    getBlackListUsers(user.id).then((users) => {
      setBlackListUsers(users);
    });
  }, [isModalOpen]);
  const currentId = user.id;
  console.log(blacklistUsers);
  return (
    <>
      <header className="w-full px-4 py-2 flex items-center justify-between">
        <LayoutButtonCircle
          type="BACK"
          handlerClick={() => props.handlerCloseBlackList()}
        ></LayoutButtonCircle>
        <h3 className="mx-auto text-xl pr-8">Чёрный список</h3>
      </header>
      <section>
        {(blacklistUsers.length === 0 && (
          <div className="flex items-center justify-center h-[90vh] text-base">
            <p className="mb-4 opacity-65 max-w-2/3 text-center">
              Сейчас у Вас нет заблокированных пользователей
            </p>
          </div>
        )) || (
          <>
            <h4 className="text-center my-5 opacity-65">
              {blacklistUsers.length} заблокированных пользователей
            </h4>
            <div>
              {blacklistUsers.map((user: UserBlacklistInterface) => {
                return (
                  <UserContactSimpleLayout
                    id_1=""
                    id_2=""
                    key={user.id}
                    {...user}
                    type="unBlock"
                    newCompanion={{
                      ...user,
                      online: false,
                    }}
                    unBlockUser={() => {
                      changeModalView('unBlock', currentId, user.id, user.name);
                    }}
                  ></UserContactSimpleLayout>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}
