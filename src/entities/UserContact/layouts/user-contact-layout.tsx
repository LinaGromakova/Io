import { useState } from 'react';
import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';
import Link from 'next/link';
import { UserContactProps } from '../interfaces/layout-props';
import { useRouter } from 'next/router';
import { BubbleMenuLayout } from '@/entities/Bubble-menu-list/bubble-menu-layout';
import { useGlobalContext } from '@/features/common/globalContext';

export function UserContactLayout(props: UserContactProps) {
  const { query } = useRouter();
  const { bubbleMenuOpen, setSidebarIsOpen } = useGlobalContext();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const isActive = query.id == props.chat_id;
  return (
    <Link href={`/${props.chat_id}`}>
      <article
        className={clsx(
          'py-3 px-5 relative flex items-center cursor-pointer rounded-2xl duration-300 transition-colors group/user',
          isActive ? 'bg-accent text-white hover:bg-accent' : 'hover:bg-inter'
        )}
        onClick={() => {
          setSidebarIsOpen(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          if (e.button === 2) {
            bubbleMenuOpen(isBubbleMenuOpen, setIsBubbleMenuOpen);
          }
        }}
      >
        <BubbleMenuLayout
          id={typeof props.user_id === 'string' ? props.user_id : ''}
          chat_id={props.chat_id}
          id_1=""
          id_2=""
          name={props.name}
          visible={isBubbleMenuOpen}
          setVisible={setIsBubbleMenuOpen}
          type="userChat"
          className="top-7 right-25"
          newCompanion={props.newCompanion}
        ></BubbleMenuLayout>

        <div className="flex items-center w-full justify-between">
          <div className="w-14 h-14 relative bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% rounded-full flex items-center justify-center">
            {(props.image && (
              <img
                src={`http://localhost:5000${props?.image}`}
                alt={props.name}
                className="w-full h-full object-cover rounded-full"
              ></img>
            )) || (
              <p className="text-center text-3xl font-bold text-white">
                {props?.name.slice(0, 1).toUpperCase()}
              </p>
            )}

            {props.online && (
              <div className="w-4 h-4 bg-accent absolute bottom-0 right-1 border-background rounded-full border-2 duration-300 transition-colors group-hover/user:border-inter"></div>
            )}
          </div>
          <div className="ml-4 flex-1/2 overflow-hidden">
            <p className="font-medium text-lg">{props.name}</p>
            <p className={clsx('text-md truncate', !isActive && 'opacity-50')}>
              {props.lastMessage}
            </p>
          </div>

          <div className="flex justify-center flex-col">
            <div className="flex">
              {(props.read && (
                <MarkDoneIcon className="mr-1"></MarkDoneIcon>
              )) || (
                <MarkOutlineIcon
                  className={clsx('mr-1', !isActive && 'opacity-50')}
                ></MarkOutlineIcon>
              )}
              <span className={clsx('text-sm', !isActive && 'opacity-50')}>
                {props.lastAtCreate}
              </span>
            </div>

            <div
              className={clsx(
                props.countMessage === 0 ? 'bg-transparent' : 'bg-accent pt-px',
                isActive && props.countMessage !== 0
                  ? 'bg-white text-accent'
                  : 'text-white',
                'w-6 h-6 rounded-full font-bold ml-auto text-center mt-1'
              )}
            >
              {props.countMessage !== 0 && props.countMessage}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
