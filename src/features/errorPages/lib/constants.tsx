import { GiBurningMeteor } from 'react-icons/gi';
import { IoMdRocket } from 'react-icons/io';
import { GiSpaceSuit } from 'react-icons/gi';

export const ERROR_ANIMATIONS = {
  meteor: {
    icon: GiBurningMeteor,
    className:
      'absolute w-28 h-28 -left-28 -rotate-90 animate-meteor text-accent',
  },
  spacesuit: {
    icon: GiSpaceSuit,
    className:
      'absolute -bottom-28 -left-28 w-28 h-28 animate-fly text-foreground/70',
  },
  rocket: {
    icon: IoMdRocket,
    className:
      'absolute -bottom-36 right-1/6 w-34 h-34 animate-spaceship text-foreground/70',
  },
};
