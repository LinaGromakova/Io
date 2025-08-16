import { useContext } from 'react';
import { GlobalContext } from '../../../widgets/Header/layouts/header-sidebar-layout';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { IoSunnyOutline as SunIcon } from 'react-icons/io5';
import { IoMoonOutline as MoonIcon } from 'react-icons/io5';
import { MdBlock as BlockIcon } from 'react-icons/md';
import { IoIosLogOut as LogOutIcon } from 'react-icons/io';

export function SidebarOptions(props) {
  const { theme, changeTheme, openOptions, changeModalView } =
    useContext(GlobalContext);

  return (
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
          onClick={() => props.handlerBlackListOpen()}
        >
          <BlockIcon className="text-xl"></BlockIcon>
          <p className="ml-4 capitalize">Чёрный список</p>
        </div>
        <div
          className="py-4 px-5 relative flex items-center rounded-2xl duration-300 transition-colors
           hover:bg-inter cursor-pointer "
          onClick={() => changeModalView('unLogin', '', 'Dante')}
        >
          <LogOutIcon className="text-xl"></LogOutIcon>
          <p className="ml-4 capitalize">Выйти</p>
        </div>
      </section>
    </>
  );
}
