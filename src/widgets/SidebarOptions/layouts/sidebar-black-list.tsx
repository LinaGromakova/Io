import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { UserContactSimpleLayout } from '@/entities/UserContact/layouts/user-contact-simple';
import { useGlobalContext } from '@/features/common/globalContext';

interface BlackListLayoutProps {
  id: string;
  name: string;
  image?: string;
  handlerCloseBlackList: () => void;
}
export function BlackListLayout(props: BlackListLayoutProps) {
  const { changeModalView, arrTest } = useGlobalContext();

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
        {(arrTest.length === 0 && (
          <div className="flex items-center justify-center h-[90vh] text-base">
            <p className="mb-4 opacity-65 max-w-2/3 text-center">
              Сейчас у Вас нет заблокированных пользователей
            </p>
          </div>
        )) || (
          <>
            <h4 className="text-center my-5 opacity-65">
              {arrTest.length} заблокированных пользователей
            </h4>
            <div>
              {arrTest.map((_r, index) => {
                return (
                  <UserContactSimpleLayout
                    key={index}
                    id={props.id}
                    name={props.name}
                    image={props.image}
                    type="unBlock"
                    newCompanion={{
                      id: props.id,
                      name: props.name,
                      image: props.image,
                      online: false,
                    }}
                    unBlockUser={() => {
                      changeModalView('unBlock', String(index), props.name);
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
