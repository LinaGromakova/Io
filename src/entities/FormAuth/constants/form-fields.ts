interface Field {
  type: string;
  name: string;
}

export const FormFields: Field[] = [
  { type: 'text', name: 'name' },
  { type: 'email', name: 'email' },
  { type: 'password', name: 'password' },
];
