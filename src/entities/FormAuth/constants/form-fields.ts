interface Field {
  type: string;
  name: string;
  placeholder: string;
}

export const formConfig = [
  {
    type: 'text',
    name: 'name',
    category: 'text',
    label: 'Имя (Логин)',
    required: true,
    placeholder: 'Твоё имя',
    maxLength: 32,
    minLength: 2,
    validate(state) {
      return (
        state.name.length >= this.minLength &&
        state.name.length <= this.maxLength &&
        state.name.trim() !== ''
      );
    },
    errorMessage: 'Имя должно содержать 2-32 символа',
  },
  {
    type: 'password',
    name: 'password',
    category: 'password',
    label: 'Пароль',
    required: true,
    placeholder: 'Пароль',
    maxLength: 24,
    minLength: 8,
    validate(state) {
      return (
        state.password.length >= this.minLength &&
        state.password.length <= this.maxLength &&
        state.password.trim() !== ''
      );
    },
    errorMessage: 'Пароль должен содержать 8-24 символа',
  },
  {
    type: 'password',
    name: 'duplicate',
    category: 'password',
    label: 'Повтори паспорт',
    required: true,
    placeholder: 'Повтори свой пароль',
    maxLength: 24,
    minLength: 8,
    validate: (state) => {
      return state.password === state.duplicate;
    },
    errorMessage: 'Пароли не совпадают!',
  },
];
