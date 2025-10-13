import {
  UserContactDetails,
  UserContactDetailsProps,
} from './layouts/UserContactDetails';
import {
  UserContactHeader,
  UserContactHeaderProps,
} from './layouts/UserContactHeader';
import {
  UserContactSimple,
  UserContactSimpleProps,
} from './layouts/UserContactSimple';

type UserContactProps =
  | ({ type: 'simple' } & UserContactSimpleProps)
  | ({ type: 'header' } & UserContactHeaderProps)
  | ({ type: 'details' } & UserContactDetailsProps);

export function UserContact(props: UserContactProps) {
  if (props.type === 'simple') {
    return <UserContactSimple {...props}></UserContactSimple>;
  }
  if (props.type === 'header') {
    return <UserContactHeader {...props}></UserContactHeader>;
  }
  if (props.type === 'details') {
    return <UserContactDetails {...props}></UserContactDetails>;
  }
}
