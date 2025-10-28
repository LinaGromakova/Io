export interface InterfaceFormField {
  type: string;
  name: string;
  label: string;
  required: boolean;
  placeholder: string;
  maxLength: number;
  minLength: number;
  validate(state: unknown): boolean;
  errorMessage: string;
}
type pagesTypes = 'login' | 'register';

export const formFields: Record<pagesTypes, InterfaceFormField[]> = {
  login: [
    {
      type: 'text',
      name: 'login',
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
      type: 'password',
      name: 'password',
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
  ],
  register: [
    {
      type: 'text',
      name: 'login',
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
      name: 'userName',
      label: 'Имя пользователя',
      required: true,
      placeholder: 'Твоё имя',
      maxLength: 32,
      minLength: 2,
      validate: function (state: { userName: string }) {
        return (
          state.userName.length >= this.minLength &&
          state.userName.length <= this.maxLength &&
          state.userName.trim() !== ''
        );
      },
      errorMessage: 'Имя должно содержать 2-32 символа',
    },
    {
      type: 'password',
      name: 'password',
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
      label: 'Повтори пароль',
      required: true,
      placeholder: 'Повтори свой пароль',
      maxLength: 24,
      minLength: 8,
      validate: function (state: { password: string; duplicate: string }) {
        return state.password === state.duplicate;
      },
      errorMessage: 'Пароли не совпадают!',
    },
  ],
};
