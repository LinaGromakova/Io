import { MainTitle } from "@/shared/Main-title/main-title";
import { LabelForm } from "@/shared/Label-form/label-form-layout";
import { InputMain } from "@/shared/Input-main/layout-input-main";
import { ButtonMain } from "@/shared/Button-main/button-main-layout";
import { FormFields } from "./constants/form-fields";
import { JSX } from "react";

export function FormAuth(): JSX.Element {
  return (
    <div className="flex w-full items-center my-[5%] h-auto portrait:h-screen portrait:my-0">
      <form
        action="#"
        className="border border-foreground/10 py-6 px-12 md:min-w-[400px] mx-auto rounded-lg max-md:px-6 max-md:w-10/12 "
      >
        <MainTitle title="form"></MainTitle>
        {FormFields.map((field, index) => {
          return (
            <LabelForm text={field.name} key={index}>
              <InputMain
                purpose="FORM"
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full"
              ></InputMain>
            </LabelForm>
          );
        })}
        <ButtonMain type="log in" className="mt-9"></ButtonMain>
        <ButtonMain type="registration"></ButtonMain>
        <ButtonMain type="submit"></ButtonMain>
      </form>
    </div>
  );
}
