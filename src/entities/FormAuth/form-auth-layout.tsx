import { MainTitle } from '@/shared/Main-title/main-title';
import { LabelForm } from '@/shared/Label-form/label-form-layout';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';
import { FormFields } from './constants/form-fields';
import { JSX } from 'react';

export function FormAuth(): JSX.Element {
  return (
    <div className='h-screen flex items-center w-full'>
      <form action='#' className='bg-accent py-6 px-12 w-[28%]  mx-auto rounded-lg'>
        <MainTitle title='form'></MainTitle>
        {FormFields.map((field, index) => {
          return (
            <LabelForm text={field.name} key={index}>
              <InputMain
                purpose='FORM'
                type={field.type}
                name={field.name}
                className='w-full'
              ></InputMain>
            </LabelForm>
          );
        })}
        <ButtonMain type='log in' className='mt-9'></ButtonMain>
        <ButtonMain type='registration'></ButtonMain>
        <ButtonMain type='submit'></ButtonMain>
      </form>
    </div>
  );
}
