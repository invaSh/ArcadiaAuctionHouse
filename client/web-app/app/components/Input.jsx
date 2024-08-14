import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, Label } from 'flowbite-react';

const Input = (props) => {
  return (
    <div className="mb-3 block">
      <Label htmlFor={props.name} className="text-lg">{props.label}</Label>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue=""
        rules={props.rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextInput
              {...field}
              id={props.name}
              color={error ? 'failure' : undefined}
              type={props.type}
            />
            {error && <p className="text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default Input;
