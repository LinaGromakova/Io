import { IoSearchOutline as SearchIcon } from 'react-icons/io5';
import { IoMdCreate as CreateIcon } from 'react-icons/io';
import { IoIosRocket as MessageIcon } from 'react-icons/io';

import { IoArrowBack as ArrowBackIcon } from 'react-icons/io5';
import { MdOutlineAddPhotoAlternate as PhotoAddIcon } from 'react-icons/md';
import { RxHamburgerMenu as HamburgerIcon } from 'react-icons/rx';
import { AiOutlineMore as MoreIcon } from 'react-icons/ai';

export const ButtonIcons = {
  SEARCH: <SearchIcon />,
  CREATE: <CreateIcon />,
  BACK: <ArrowBackIcon />,
  OPTIONS: <HamburgerIcon></HamburgerIcon>,
  PHOTO_ADD: <PhotoAddIcon></PhotoAddIcon>,
  MORE: <MoreIcon></MoreIcon>,
  MESSAGE: <MessageIcon className="text-2xl" />,
};
