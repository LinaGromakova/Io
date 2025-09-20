'use client';
import { MainTitle } from '@/shared/Main-title/main-title';
import { LabelForm } from '@/shared/Label-form/label-form-layout';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';
import { formConfig } from './constants/form-fields';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { useGlobalContext } from '@/features/common/globalContext';
import { useLocalStorage } from '@/features/common/hooks/useLocalStorage/useLocalStorage';

interface UserInterface {
  id: string;
  name: string;
  login: string;
  image: string;
  online: boolean;
  last_seen: string;
  created_at: string;
}
type ModalMessageTypeState = {
  message: string;
  open: boolean;
};
async function signInUser(
  dataAuth: interfaceForm,
  router: NextRouter,
  setState: React.Dispatch<React.SetStateAction<UserInterface>>,
  setStateModal: React.Dispatch<React.SetStateAction<ModalMessageTypeState>>,
  updateUser,
  updateSessionId
) {
  try {
    const data = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dataAuth),
    });
    const result = await data.json();
    if (data.status === 401) {
      return setStateModal({ message: result.message, open: true });
    } else {
      if (result) {
        console.log(result);
        updateUser(result.user);
        updateSessionId(result.sessionId);
        setState(result.user);
        router.replace('/');
      }
    }
  } catch (error) {
    console.log(error);
  }
}
async function registrationUser(
  dataAuth: { [k: string]: string },
  router: NextRouter,
  setState: React.Dispatch<React.SetStateAction<UserInterface>>,
  setStateModal: React.Dispatch<React.SetStateAction<ModalMessageTypeState>>,
  updateUser,
  updateSessionId
) {
  try {
    const data = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dataAuth),
    });
    const result = await data.json();
    if (data.status === 409) {
      return setStateModal({ message: result.message, open: true });
    } else {
      console.log(result);
      if (result) {
        updateUser(result.user);
        updateSessionId(result.sessionId);
        setState(result.user);
        router.replace('/');
      }
    }
  } catch (error) {
    console.log(error);
  }
}

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
  const { updateSessionId, updateUser } = useLocalStorage();
  const { setUser, setIsModalMessageOpen, isModalMessageOpen } =
    useGlobalContext();
  const [formData, setFormData] = useState<interfaceForm>(configForm);
  const [isAuth, setIsAuth] = useState(true);
  const router = useRouter();
  const page = router.route.slice(1);

  async function checkSession() {
    try {
      const data = await fetch('http://localhost:5000/session-check', {
        credentials: 'include',
      });
      if (data.status === 401) {
        return await data.json();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }
  useLayoutEffect(() => {
    checkSession().then((res) => {
      if (res === 401) {
        setIsAuth(false);
      }
    });
  }, [router]);
  useLayoutEffect(() => {
    if (isAuth) {
      router.replace('/');
    }
  }, [isAuth]);
  function handlerInput(e: { target: { value: string; name: string } }) {
    const value = e.target.value;
    const name = e.target.name;
    return setFormData((prev) => ({ ...prev, [name]: value }));
  }
  console.log(isModalMessageOpen);
  const validArray: boolean[] = [];
  return (
    <>
      {!isAuth && (
        <div className="flex w-full items-center my-[5%] h-auto portrait:h-screen portrait:my-0">
          <form
            action="#"
            method="post"
            className="border border-foreground/10 py-6 px-12 md:min-w-[400px] mx-auto rounded-lg max-md:px-6 max-md:w-10/12 "
          >
            <MainTitle title={page}></MainTitle>
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
                    purpose="FORM"
                    inputRef={null}
                    sendMessage={() => ''}
                    value={formData[field.name]}
                    changeHandler={(e) => handlerInput(e)}
                    {...field}
                    className="w-full"
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
                  type="login"
                  disabled={!validArray.every((par) => par)}
                  handlerClick={(e) => {
                    e.preventDefault();
                    signInUser(
                      formData,
                      router,
                      setUser,
                      setIsModalMessageOpen,
                      updateUser,
                      updateSessionId
                    );
                  }}
                ></ButtonMain>
                <Link href="/register">
                  <p className="mt-3 text-xs opacity-70 hover:opacity-100 hover:underline duration-300">
                    Нет аккаунта? Зарегистрироваться!
                  </p>
                </Link>
              </>
            )) || (
              <>
                <ButtonMain
                  type="register"
                  disabled={!validArray.every((par) => par)}
                  handlerClick={(e) => {
                    e.preventDefault();
                    const dataAuth = Object.fromEntries(
                      Object.entries(formData).filter(
                        ([key]) => key !== 'duplicate'
                      )
                    );
                    registrationUser(
                      dataAuth,
                      router,
                      setUser,
                      setIsModalMessageOpen,
                      updateUser,
                      updateSessionId
                    );
                  }}
                ></ButtonMain>
                <Link href="/login">
                  <p className="mt-3 text-xs opacity-70 hover:opacity-100 hover:underline">
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
