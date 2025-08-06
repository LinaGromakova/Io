import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../Header/layouts/header-sidebar-layout';
import clsx from 'clsx';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { IoSunnyOutline as SunIcon } from 'react-icons/io5';
import { IoMoonOutline as MoonIcon } from 'react-icons/io5';
import { MdBlock as BlockIcon } from 'react-icons/md';
import { IoIosLogOut as LogOutIcon } from 'react-icons/io';
import { IoLockOpenOutline as LockOpenIcon } from 'react-icons/io5';

export function SidebarOptionsLayout(props) {
  const { theme, changeTheme, isOpen, openOptions } = useContext(GlobalContext);
  const [blackListIsOpen, setBlackListIsOpen] = useState(false);
  const [arrTest, setArrTest] = useState([1, 2, 3, 4, 5]);

  const scroll: string = `[&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:transparent
  hover:[&::-webkit-scrollbar-thumb]:transparent
  [&::-webkit-scrollbar-thumb]:rounded-full`;

  function blackListOpen() {
    setBlackListIsOpen(!blackListIsOpen);
  }

  return (
    <aside
      data-open={isOpen}
      className={clsx(
        `overflow-y-scroll fixed top-0 w-4/12 left-0 overflow-x-hidden h-screen border-r border-r-foreground/10 max-sm:w-full bg-background -z-10 max-md:w-8/12 opacity-0 duration-300`,
        scroll
      )}
    >
      {(blackListIsOpen && (
        <>
          <header className="w-full px-4 py-2 flex items-center justify-between">
            <LayoutButtonCircle
              type="BACK"
              handlerClick={() => blackListOpen()}
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
                          const newList = [...arrTest];
                          newList.splice(index, 1);
                          setArrTest(newList);
                        }}
                      ></UserBlackList>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        </>
      )) || (
        <>
          <header className="w-full px-4 py-2">
            <LayoutButtonCircle
              type="BACK"
              handlerClick={() => openOptions()}
            ></LayoutButtonCircle>
          </header>
          <section className="flex items-center justify-center ">
            <div className="w-35 h-35 relative bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% rounded-full flex items-center justify-center">
              {(props.image && (
                <img
                  src={props?.image}
                  alt={props.name}
                  className="w-full h-full object-cover rounded-full"
                ></img>
              )) || (
                <p className="text-center text-6xl font-bold text-white">
                  {props?.name.slice(0, 1).toUpperCase()}
                </p>
              )}

              <LayoutButtonCircle
                type="PHOTO_ADD"
                className="absolute bottom-0 right-0 overflow-hidden"
              >
                <input
                  type="file"
                  name="image-file"
                  accept=".jpg, .png"
                  className="opacity-0 absolute p-20 top-0 left-0 bg-red-800 w-full h-full cursor-pointer"
                />
              </LayoutButtonCircle>
            </div>
            <div className="ml-8">
              <p className="text-xl">{props.name}</p>
              <p className="mt-0.5 text-sm opacity-50">online</p>
            </div>
          </section>
          <section>
            <h3 className="text-2xl py-6 px-4">Настройки</h3>
            <div
              className="py-4 px-5 relative flex items-center rounded-2xl duration-300 transition-colors
           hover:bg-inter cursor-pointer"
              onClick={() => changeTheme()}
            >
              {theme === 'dark' ? (
                <MoonIcon className="text-xl"></MoonIcon>
              ) : (
                <SunIcon className="text-xl"></SunIcon>
              )}
              <p className="ml-4 capitalize">{theme}</p>
            </div>
            <div
              className="py-4 px-5 relative flex items-center rounded-2xl duration-300 transition-colors
           hover:bg-inter cursor-pointer"
              onClick={() => blackListOpen()}
            >
              <BlockIcon className="text-xl"></BlockIcon>
              <p className="ml-4 capitalize">Чёрный список</p>
            </div>
            <div
              className="py-4 px-5 relative flex items-center rounded-2xl duration-300 transition-colors
           hover:bg-inter cursor-pointer "
            >
              <LogOutIcon className="text-xl"></LogOutIcon>
              <p className="ml-4 capitalize">Выйти</p>
            </div>
          </section>
        </>
      )}
    </aside>
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
        props.unBlockUser();
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
            setIsPropmtVisible((prev) => !prev);
          }}
        ></LayoutButtonCircle>
        {isPropmtVisible && prompt}
      </div>
    </article>
  );
}
