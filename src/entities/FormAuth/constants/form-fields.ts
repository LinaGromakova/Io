interface Field {
  type: string;
  name: string;
  placeholder: string;
}

export const FormFields: Field[] = [
  { type: 'text', name: 'name', placeholder: 'Your name' },
  { type: 'email', name: 'email', placeholder: 'Your email' },
  { type: 'password', name: 'password', placeholder: 'Password' },
];
