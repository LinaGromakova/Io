import React, { SetStateAction } from 'react';
import { ButtonSaveNewName } from './ButtonSaveNewName';
import { EditInputName } from './InputEditName';
import { MessageInputEdit } from './MessageInputEdit';
interface EditUserNameInterface {
  currentName: string;
  value: string;
  setState: React.Dispatch<SetStateAction<string>>;
  handlerSave: React.Dispatch<SetStateAction<string>>;
  message: 'error' | 'base';
}
export function EditUserName({
  currentName,
  value,
  setState,
  handlerSave,
  message,
}: EditUserNameInterface) {
  return (
    <div className="ml-4 h-24 mt-6 w-40  ">
      <div className="relative mb-2.5 flex max-w-2/3">
        <EditInputName value={value} setState={setState}></EditInputName>
        {value.length > 1 && currentName !== value && (
          <ButtonSaveNewName
            value={value}
            handlerSave={handlerSave}
          ></ButtonSaveNewName>
        )}
      </div>

      <MessageInputEdit
        message={message}
        currentName={currentName}
      ></MessageInputEdit>
    </div>
  );
}
