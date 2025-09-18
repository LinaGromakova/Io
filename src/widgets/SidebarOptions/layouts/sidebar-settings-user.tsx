import { IoIosCheckmark as CheckmarkIcon } from 'react-icons/io';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';
import { useGlobalContext } from '@/features/common/globalContext';
import { useEffect, useState } from 'react';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

interface SidebarSettingsUserLProps {
  name: string;
  image?: string;
}

export function SidebarSettingsUserLayout(props: SidebarSettingsUserLProps) {
  const {
    changeModalView,
    user,
    setUser,
    isOpenSettingsUser,
    setIsOpenSettingUser,
    setIsModalMessageOpen,
  } = useGlobalContext();

  const [nameInputValue, setNameInputValue] = useState('');
  const [newPhotoUser, setNewPhotoUser] = useState<File | null>(null);
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
      setUser((prev) => ({ ...prev, name: result }));
      console.log(result);
      setIsModalMessageOpen({ message: 'Новое имя сохранено!', open: true });
      setNameInputValue('');
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
      setNewPhotoUser(null);
      setUser((prev) => ({ ...prev, image: result.avatarUrl }));
      setIsModalMessageOpen({ message: 'Новое фото сохранено!', open: true });
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    return () => {
      if (newPhotoUser) {
        URL.revokeObjectURL(URL.createObjectURL(newPhotoUser));
      }
    };
  }, [newPhotoUser]);
  useEffect(() => {
    if (!isOpenSettingsUser) {
      setNameInputValue('');
      setNewPhotoUser(null);
    }
  }, [isOpenSettingsUser]);

  return (
    <>
      <header className="w-full px-4 flex items-center mt-2">
        <LayoutButtonCircle
          type="BACK"
          className="min-w-9"
          handlerClick={() => {
            if (newPhotoUser || nameInputValue) {
              changeModalView('exitNotSave');
            } else {
              setIsOpenSettingUser(false);
              setNameInputValue('');
              setNewPhotoUser(null);
            }
          }}
        ></LayoutButtonCircle>
        <h3 className="text-2xl px-4 text-center ml-auto mr-auto">
          Настройки пользователя
        </h3>
      </header>
      <section
        className="flex items-center mb-10 pt-6 justify-center 
      max-lg:flex-col 
                   max-md:flex-row 
                    [@media(max-width:350px)]:flex-col"
      >
        <div className="w-35 h-35 min-w-35 relative bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% rounded-full flex items-center justify-center">
          {newPhotoUser ? (
            <img
              src={URL.createObjectURL(newPhotoUser)}
              alt={props.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : props.image ? (
            <img
              src={`http://localhost:5000${props.image}`}
              alt={props.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <p className="text-center text-6xl font-bold text-white">
              {props.name?.slice(0, 1).toUpperCase()}
            </p>
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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setNewPhotoUser(file);
                }
              }}
              className="opacity-0 absolute p-20 top-0 left-0 w-full h-full cursor-pointer
                  "
            />
          </LayoutButtonCircle>
        </div>
        <div className="ml-4 h-24 mt-6 w-40  ">
          <div className="relative mb-2.5 flex max-w-2/3">
            <input
              className="border-b border-foreground/50 placeholder:text-foreground/50 duration-300 focus:outline-0 focus:border-foreground/80
                 focus:placeholder:text-foreground/80 p-1 w-[140px] block
                "
              value={nameInputValue}
              onChange={(e) => {
                if (e.target.value.length === 32) {
                  return;
                }
                setNameInputValue(e.target.value.trim());
              }}
              type="text"
              minLength={2}
              maxLength={32}
              placeholder="Новое имя"
            />
            {nameInputValue.length > 1 && props.name !== nameInputValue && (
              <button
                type="button"
                className="ml-1 w-8 h-8 absolute -right-15 cursor-pointer"
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

          {(props.name === nameInputValue && (
            <p className="text-sm text-red-500 opacity-80 w-full">
              Новое имя не должно повторять старое!
            </p>
          )) || (
            <p className="text-sm opacity-50 w-full">
              Текущее имя: {props.name}
            </p>
          )}
        </div>
      </section>
      {newPhotoUser && (
        <ButtonMain
          type="apply photo"
          className="max-w-1/2 mx-auto max-lg:max-w-3/4 "
          handlerClick={handleFileSelect}
        ></ButtonMain>
      )}
    </>
  );
}
