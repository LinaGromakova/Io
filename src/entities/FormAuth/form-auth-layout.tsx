import { MainTitle } from '@/shared/Main-title/main-title';
import { LabelForm } from '@/shared/Label-form/label-form-layout';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';
import { formConfig } from './constants/form-fields';
import { JSX, useState } from 'react';
import { useRouter } from 'next/router';
const configForm = { name: '', password: '', duplicate: '' };
export function FormAuth(): JSX.Element {
  const [formData, setFormData] = useState(configForm);
  const router = useRouter();

  function handlerInput(e) {
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
        <MainTitle title={router.route.slice(1)}></MainTitle>
        {formConfig.map((field, index) => {
          validArray.push(field.validate?.(formData));
          console.log(validArray);
          return (
            <LabelForm text={field.label} key={index}>
              <InputMain
                purpose="FORM"
                value={formData[field.name]}
                changeHandler={(e) => handlerInput(e)}
                {...field}
                className="w-full"
                valid={field.validate?.(formData)}
                message={formData[field.name] !== '' && field.errorMessage}
                onKeyDown={(e) => e.key === ' ' && e.preventDefault()}
              ></InputMain>
            </LabelForm>
          );
        })}

        <ButtonMain
          type="submit"
          disabled={!validArray.every((par) => par)}
          handlerClick={(e) => {
            e.preventDefault(e);
            console.log(validArray);
            delete formData.duplicate;
            console.log(formData);
          }}
        ></ButtonMain>
      </form>
    </div>
  );
}
