interface Field {
  type: string;
  name: string;
  placeholder: string;
}

export const formConfig = [
   { type: 'text', name: 'name', placeholder: 'Your name', maxLength: 20, minlenght: 2 },
  { type: 'tel', name: 'telephone', placeholder: 'Your phone number', minLenght: 10, maxLenght: 10 },
  { type: 'password', name: 'password', placeholder: 'Password', maxLenght: 64, minLenght: 8 },
  {type: 'password', name: 'duplicate', placeholder: 'Repeat your passport', maxLenght: 64, minLenght: 8 }
]