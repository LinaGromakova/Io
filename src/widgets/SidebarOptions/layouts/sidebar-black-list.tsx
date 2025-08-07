import { useContext, useEffect, useRef, useState } from 'react';

import { IoLockOpenOutline as LockOpenIcon } from 'react-icons/io5';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';

export function BlackListLayout(props) {
  const [arrTest, setArrTest] = useState([1, 2, 3, 4, 5]);
  const { changeModalView } = useContext(GlobalContext);
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
                  <UserBlackList
                    key={index}
                    name={props.name}
                    image={props.image}
                    unBlockUser={() => {
                      changeModalView('unBlock');
                    }}
                  ></UserBlackList>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}

function UserBlackList(props) {
  const [isPropmtVisible, setIsPropmtVisible] = useState(false);
  const promptRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (promptRef.current && !promptRef.current.contains(e.target)) {
        setIsPropmtVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const prompt = (
    <article
      onClick={() => {
        setIsPropmtVisible(false);
      }}
      className="absolute flex items-center top-11 bg-accent right-0 text-sm p-1.5 rounded-sm z-50 hover:bg-amber-600 duration-300"
      ref={promptRef}
    >
      <LockOpenIcon className="mr-1.5 text-base"></LockOpenIcon>
      Разблокировать
    </article>
  );

  return (
    <article
      className="py-3 px-5 relative flex items-center cursor-pointer rounded-2xl duration-300
               transition-colors hover:bg-inter justify-between"
    >
      <div className="flex items-center">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 relative bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% rounded-full flex items-center justify-center">
            {(props.image && (
              <img
                src={props?.image}
                alt={props.name}
                className="w-full h-full object-cover rounded-full"
              ></img>
            )) || (
              <p className="text-center text-3xl font-bold text-white">
                {props?.name.slice(0, 1).toUpperCase()}
              </p>
            )}
          </div>
        </div>
        <div className="ml-4 overflow-hidden">
          <p className="font-medium text-lg">{props.name}</p>
        </div>
      </div>
      <div className="relative">
        <LayoutButtonCircle
          type="MORE"
          handlerClick={() => {
            props.unBlockUser();
          }}
        ></LayoutButtonCircle>
        {isPropmtVisible && prompt}
      </div>
    </article>
  );
}
