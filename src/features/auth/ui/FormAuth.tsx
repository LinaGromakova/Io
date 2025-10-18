'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { CustomTitle } from '@/shared/ui/CustomTitle';
import { LabelForm } from '@/shared/ui/LabelForm';
import { InputMain } from '@/shared/ui/InputMain';
import { ButtonMain } from '@/shared/ui/ButtonMain';
import { RedirectionLink } from './RedirectionLink';
import { useAuth } from '../hooks/useAuth';
import { formFields } from '../config/formFields';

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
export function FormAuth({ page }: { page: 'login' | 'register' }) {
  const { authUser } = useAuth();
  const [formData, setFormData] = useState<interfaceForm>(configForm);

  const validArray: boolean[] = [];
  return (
    <div
      className={clsx(
        'flex w-full h-screen items-center portrait:h-screen portrait:my-0  bg-gradient-to-t from-accent/80  to-accent-shadow/50'
      )}
    >
      <form
        action="#"
        method="post"
        className="border border-foreground/10 bg-background py-6 px-12 md:min-w-[400px] mx-auto rounded-lg max-md:px-6 max-md:w-10/12 "
      >
        <CustomTitle title={page}></CustomTitle>
        {formFields[page].map((field, index: number) => {
          validArray.push(field.validate(formData));
          return (
            <LabelForm text={field.label} key={index}>
              <InputMain
                purpose="form"
                value={formData[field.name]}
                setState={setFormData}
                valid={field.validate?.(formData)}
                message={formData[field.name] !== '' ? field.errorMessage : ''}
                {...field}
              ></InputMain>
            </LabelForm>
          );
        })}
        <ButtonMain
          actionType={page}
          type="submit"
          text={page}
          disabled={!validArray.every((par) => par)}
          handlerClick={(e) => {
            authUser(e, page, formData);
          }}
        ></ButtonMain>
        <RedirectionLink page={page}></RedirectionLink>
      </form>
    </div>
  );
}
