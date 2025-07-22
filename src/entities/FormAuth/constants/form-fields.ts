interface Field {
  type: string;
  name: string;
  placeholder: string;
}

export const formConfig = [
  {
    type: 'text',
    name: 'login',
    category: 'text',
    label: 'Логин',
    required: true,
    placeholder: 'Твой логин',
    maxLength: 32,
    minLength: 2,
    validate(state) {
      return (
        state.login.length >= this.minLength &&
        state.login.length <= this.maxLength &&
        state.login.trim() !== ''
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
    label: 'Повтори пароль',
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
