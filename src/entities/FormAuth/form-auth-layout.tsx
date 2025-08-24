'use client';
import { MainTitle } from '@/shared/Main-title/main-title';
import { LabelForm } from '@/shared/Label-form/label-form-layout';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';
import { formConfig } from './constants/form-fields';
import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';

async function signInUser(dataAuth: interfaceForm, router: NextRouter) {
  try {
    const data = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAuth),
    });
    const result = await data.json();
    if (result) {
      router.replace('/');
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
}
async function registrationUser(
  dataAuth: { [k: string]: string },
  router: NextRouter
) {
  try {
    const data = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAuth),
    });
    const result = await data.json();
    console.log(result);
    if (result) {
      router.replace('/');
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
                value={formData[field.name]}
                changeHandler={(e) => handlerInput(e)}
                {...field}
                className="w-full"
                valid={field.validate?.(formData, page)}
                message={formData[field.name] !== '' ? field.errorMessage : ''}
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
                console.log(validArray);

                signInUser(formData, router);
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

                console.log(dataAuth);
                registrationUser(dataAuth, router);
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
  );
}
