interface InterfaceFormField {
  type: string;
  name: string;
  category: string;
  label: string;
  required: boolean;
  placeholder: string;
  maxLength: number;
  minLength: number;
  validate(state: unknown, page?: string): boolean;
  errorMessage: string;
}
export const formConfig: InterfaceFormField[] = [
  {
    type: 'text',
    name: 'login',
    category: 'text',
    label: 'Логин',
    required: true,
    placeholder: 'Твой логин',
    maxLength: 32,
    minLength: 2,
    validate(state: { login: string }) {
      return (
        state.login.length >= this.minLength &&
        state.login.length <= this.maxLength &&
        state.login.trim() !== ''
      );
    },
    errorMessage: 'Логин должен содержать 2-32 символа',
  },
  {
    type: 'text',
    name: 'name',
    category: 'text',
    label: 'Имя пользователя',
    required: true,
    placeholder: 'Твоё имя',
    maxLength: 32,
    minLength: 2,
    validate: function (state: { name: string }, page: string) {
      if (page === 'login') {
        return true;
      } else
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
    validate(state: { password: string }) {
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
    validate: function (
      state: { password: string; duplicate: string },
      page: string
    ) {
      if (page === 'login') {
        return true;
      }
      return state.password === state.duplicate;
    },
    errorMessage: 'Пароли не совпадают!',
  },
];
