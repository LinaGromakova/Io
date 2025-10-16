'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { CustomTitle } from '@/shared/ui/CustomTitle';
import { LabelForm } from '@/shared/ui/LabelForm';
import { InputMain } from '@/shared/ui/InputMain';
import { ButtonMain } from '@/shared/ui/ButtonMain';
import { formConfig } from './constants/form-fields';
import { NextRouter, useRouter } from 'next/router';



// interface UserInterface {
//   id: string;
//   name: string;
//   image: string;
//   online: boolean;
//   last_seen: string;
//   created_at: string;
// }
// type ModalMessageTypeState = {
//   message: string;
//   open: boolean;
// };
// async function authUser(
//   actionType: 'login' | 'register',
//   dataAuth: interfaceForm | { [k: string]: string },
//   router: NextRouter,
//   setState: React.Dispatch<React.SetStateAction<UserInterface>>,
//   setStateModal: React.Dispatch<React.SetStateAction<ModalMessageTypeState>>,
//   updateUser: (user: UserInterface) => void,
//   updateAuth: React.Dispatch<React.SetStateAction<boolean>>
// ) {
//   try {
//     const data = await fetch(`http://localhost:5000/${actionType}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify(dataAuth),
//     });
//     const result = await data.json();
//     if (data.status === 401 || data.status === 409) {
//       return setStateModal({ message: result.message, open: true });
//     } else {
//       if (result) {
//         updateUser(result.user);
//         updateAuth(true);
//         setState(result.user);
//         router.replace('/');
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

interface interfaceForm {
  login: string;
  name: string;
  password: string;
  duplicate: string;
  [key: string]: string;
}
const configForm: interfaceForm = {
  login: '',
  name: '',
  password: '',
  duplicate: '',
};
export function FormAuth() {
  const { updateUser } = useLocalStorage();
  const { setUser, setIsModalMessageOpen, isAuth, setIsAuth } =
    useGlobalContext();
  const [formData, setFormData] = useState<interfaceForm>(configForm);
  const router = useRouter();
  const page = router.route.slice(1);

  function handlerInput(e: { target: { value: string; name: string } }) {
    const value = e.target.value;
    const name = e.target.name;
    return setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const validArray: boolean[] = [];
  return (
    <>
      {!isAuth && (
        <div
          className={clsx(
            'flex w-full h-screen items-center   portrait:h-screen portrait:my-0  bg-gradient-to-t from-accent/80  to-accent-shadow/50'
          )}
        >
          <form
            action="#"
            method="post"
            className="border border-foreground/10 bg-background py-6 px-12 md:min-w-[400px] mx-auto rounded-lg max-md:px-6 max-md:w-10/12 "
          >
            <CustomTitle title={page}></CustomTitle>
            {formConfig.map((field, index) => {
              validArray.push(field.validate(formData, page));
              if (
                (field.name === 'duplicate' && page === 'login') ||
                (field.name === 'name' && page === 'login')
              ) {
                return null;
              }

              return (
                <LabelForm text={field.label} key={index}>
                  <InputMain
                    purpose="form"
                    value={formData[field.name]}
                    changeHandler={(e) => handlerInput(e)}
                    {...field}
                    valid={field.validate?.(formData, page)}
                    message={
                      formData[field.name] !== '' ? field.errorMessage : ''
                    }
                    onKeyDownHandler={(e: {
                      key: string;
                      preventDefault: () => void;
                    }) => e.key === ' ' && e.preventDefault()}
                  ></InputMain>
                </LabelForm>
              );
            })}

            {(page === 'login' && (
              <>
                <ButtonMain
                  actionType="login"
                  type="submit"
                  text="Login"
                  disabled={!validArray.every((par) => par)}
                  handlerClick={(e) => {
                    e.preventDefault();
                    authUser(
                      'login',
                      formData,
                      router,
                      setUser,
                      setIsModalMessageOpen,
                      updateUser,
                      setIsAuth
                    );
                  }}
                ></ButtonMain>
                <Link href="/register">
                  <p className="mt-3 text-xs opacity-70 hover:opacity-100 hover:underline duration-300 ml-2">
                    Нет аккаунта? Зарегистрироваться!
                  </p>
                </Link>
              </>
            )) || (
              <>
                <ButtonMain
                  actionType="register"
                  type="submit"
                  text="Register"
                  disabled={!validArray.every((par) => par)}
                  handlerClick={(e) => {
                    e.preventDefault();
                    const dataAuth = Object.fromEntries(
                      Object.entries(formData).filter(
                        ([key]) => key !== 'duplicate'
                      )
                    );
                    authUser(
                      'register',
                      dataAuth,
                      router,
                      setUser,
                      setIsModalMessageOpen,
                      updateUser,
                      setIsAuth
                    );
                  }}
                ></ButtonMain>
                <Link href="/login">
                  <p className="mt-3 text-xs opacity-70 hover:opacity-100 hover:underline ml-2">
                    Уже есть аккаунт? Войти!
                  </p>
                </Link>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
