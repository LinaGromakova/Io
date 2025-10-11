import React from 'react';
import { FormInput, FormInputProps } from './layouts/FormInput';
import { MessageInput, MessageInputProps } from './layouts/MessageInput';
import { FilterInput, FilterInputProps } from './layouts/FilterInput';

type InputProps =
  | ({ purpose: 'form' } & FormInputProps)
  | ({ purpose: 'message' } & MessageInputProps)
  | ({ purpose: 'filter' } & FilterInputProps);

const inputStyle = `bg-inter placeholder:text-foreground/50
        font-medium text-sm py-2 px-4 transition-colors
        duration-300
         `;
export function InputMain(props: InputProps) {
  if (props.purpose === 'form') {
    return <FormInput {...props} className={inputStyle}></FormInput>;
  }
  if (props.purpose === 'message') {
    return <MessageInput {...props} className={inputStyle}></MessageInput>;
  }
  if (props.purpose === 'filter') {
    return <FilterInput {...props} className={inputStyle}></FilterInput>;
  }
}
