import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { IoSunnyOutline as SunIcon } from 'react-icons/io5';
import { IoMoonOutline as MoonIcon } from 'react-icons/io5';
import { MdBlock as BlockIcon } from 'react-icons/md';
import { IoIosLogOut as LogOutIcon } from 'react-icons/io';
import { useGlobalContext } from '@/features/common/globalContext';
import { useEffect, useState } from 'react';

import { IoIosCheckmark as CheckmarkIcon } from 'react-icons/io';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';

interface SidebarOptionsProps {
  name: string;
  image?: string;
  handlerBlackListOpen: () => void;
}
export function SidebarOptions(props: SidebarOptionsProps) {
  const { theme, changeTheme, openOptions, changeModalView, user } =
    useGlobalContext();
  const [isOpenSettingsUser, setIsOpenSettingUser] = useState(false);
  const [nameInputValue, setNameInputValue] = useState('');
  const [newPhotoUser, setNewPhotoUser] = useState('');

  async function changeUserName() {
    try {
      const response = await fetch('http://localhost:5000/profile/name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.id, newName: nameInputValue }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  async function handleFileSelect() {
    const file = newPhotoUser;
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('user_id', user.id);

    try {
      const response = await fetch('http://localhost:5000/avatar', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // useEffect(() => {
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     imagePreview.src = e.target.result;
  //   };
  // }, [newPhotoUser]);
  console.log(user.image);
  console.log(newPhotoUser);
  return (
    <>
      {(isOpenSettingsUser && (
        <>
          <header className="w-full px-4 flex items-center mt-2">
            <LayoutButtonCircle
              type="BACK"
              handlerClick={() => {
                setIsOpenSettingUser(false);
                setNameInputValue('');
                setNewPhotoUser('');
              }}
            ></LayoutButtonCircle>
            <h3 className="text-2xl px-4 text-center ml-auto mr-auto">
              Настройки пользователя
            </h3>
          </header>
          <section className="flex items-center mb-10 pt-6 justify-center">
            <div className="w-35 h-35 relative bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% rounded-full flex items-center justify-center">
              {(props.image && (
                <img
                  src={`http://localhost:5000${user.image}`}
                  alt={props.name}
                  className="w-full h-full object-cover rounded-full"
                ></img>
              )) || (
                <p className="text-center text-6xl font-bold text-white">
                  {props.name?.slice(0, 1).toUpperCase()}
                </p>
                //   <img
                //     src={newPhotoUser}
                //     alt={props.name}
                //     className="w-full h-full object-cover rounded-full"
                //   ></img>
              )}

              <LayoutButtonCircle
                handlerClick={() => null}
                type="PHOTO_ADD"
                className="absolute bottom-0 right-0 overflow-hidden"
              >
                <input
                  type="file"
                  name="image-file"
                  accept=".jpg, .png"
                  onChange={(e) => setNewPhotoUser(e.target.files[0])}
                  className="opacity-0 absolute p-20 top-0 left-0 w-full h-full cursor-pointer
                  "
                />
              </LayoutButtonCircle>
            </div>
            <div className="ml-4">
              <div className="relative mb-2.5 flex max-w-2/3">
                <input
                  className="border-b border-foreground/50 placeholder:text-foreground/50 duration-300 focus:outline-0 focus:border-foreground/80
                 focus:placeholder:text-foreground/80 p-1 w-full
                "
                  value={nameInputValue}
                  onChange={(e) => {
                    if (e.target.value.length === 32) {
                      return;
                    }
                    setNameInputValue(e.target.value);
                  }}
                  type="text"
                  minLength={2}
                  maxLength={32}
                  placeholder="Новое имя"
                />
                {nameInputValue.length > 1 && (
                  <button
                    type="button"
                    className="ml-1 w-8 h-8 absolute -right-8"
                    onClick={() => {
                      if (!nameInputValue) {
                        return;
                      }
                      changeUserName();
                    }}
                  >
                    <CheckmarkIcon className="text-foreground/50 hover:text-foreground/80 text-4xl duration-300"></CheckmarkIcon>
                  </button>
                )}
              </div>
              <span className="text-base opacity-50">
                Текущее имя: {props.name}
              </span>
            </div>
          </section>
          {newPhotoUser && (
            <ButtonMain
              type="apply photo"
              className="max-w-1/2 mx-auto"
              handlerClick={handleFileSelect}
            ></ButtonMain>
          )}
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
                  src={`http://localhost:5000${user.image}`}
                  alt={props.name}
                  className="w-full h-full object-cover rounded-full"
                ></img>
              )) || (
                <p className="text-center text-6xl font-bold text-white">
                  {props.name?.slice(0, 1).toUpperCase()}
                </p>
              )}
              <LayoutButtonCircle
                handlerClick={() => setIsOpenSettingUser(true)}
                type="CREATE"
                className="absolute bottom-0 right-0 overflow-hidden"
              ></LayoutButtonCircle>
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
              onClick={() => props.handlerBlackListOpen()}
            >
              <BlockIcon className="text-xl"></BlockIcon>
              <p className="ml-4 capitalize">Чёрный список</p>
            </div>
            <div
              className="py-4 px-5 relative flex items-center rounded-2xl duration-300 transition-colors
           hover:bg-inter cursor-pointer "
              onClick={() =>
                changeModalView('unLogin', undefined, undefined, props.name)
              }
            >
              <LogOutIcon className="text-xl"></LogOutIcon>
              <p className="ml-4 capitalize">Выйти</p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
