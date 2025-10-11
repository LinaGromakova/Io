import { BubbleMenuLayout } from '@/entities/Bubble-menu-list/bubble-menu-layout';
import { useGlobalContext } from '@/features/common/globalContext';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';

import clsx from 'clsx';
import { useState } from 'react';

interface UserContactSimpleProps {
  id: string;
  name: string;
  image: string;
  type: 'unBlock' | 'writeUser';
  newCompanion: User;
  unBlockUser?: () => void;
  id_1: string;
  id_2: string;
}
interface User {
  id: string;
  image: string;
  name: string;
  online: boolean;
}
export function UserContactSimpleLayout(props: UserContactSimpleProps) {
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const { bubbleMenuOpen } = useGlobalContext();
  return (
    <article
      className={clsx(
        `py-3 px-5 relative flex items-center cursor-pointer
         rounded-2xl duration-300 transition-colors  justify-between  my-2`,
        isBubbleMenuOpen
          ? 'bg-inter/90 hover:bg-inter'
          : 'bg-inter/40 hover:bg-inter/60'
      )}
      onContextMenu={(e) => {
        e.preventDefault();
        if (props.type === 'unBlock') {
          if (e.button === 2) {
            bubbleMenuOpen(isBubbleMenuOpen, setIsBubbleMenuOpen);
          }
        }
      }}
      onClick={() => setIsBubbleMenuOpen(true)}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-between">
          <div
            className={clsx(
              'w-14 h-14 relative rounded-full flex items-center justify-center',
              !props.image &&
                'bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% '
            )}
          >
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
          </div>
        </div>
        <div className="ml-4 overflow-hidden">
          <p className="font-medium text-lg">{props.name}</p>
        </div>
      </div>
      <div className="relative">
        {props.type === 'unBlock' && (
          <ButtonCircle
            actionType="more"
            handlerClick={() => setIsBubbleMenuOpen(true)}
          ></ButtonCircle>
        )}
        <BubbleMenuLayout
          id={props.id}
          id_1={props.id_1}
          id_2={props.id_2}
          name={props.name}
          current_id={props.id_2}
          chat_id=""
          visible={isBubbleMenuOpen}
          setVisible={setIsBubbleMenuOpen}
          type={props.type}
          className="top-0 right-10"
          newCompanion={props.newCompanion}
        ></BubbleMenuLayout>
      </div>
    </article>
  );
}
