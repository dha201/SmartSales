/**
 * Provide a switch statement that check the input type. 
 * Then basing on the input type, it will render the appropriate form component.
 */

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'; //provides a component for displaying error messages in forms managed by React Hook Form.
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = {
    type: 'text' | 'email' | 'password'
    inputType: 'select' | 'input' | 'textarea'
    options?: { value: string; label: string; id: string }[]
    label?: string
    placeholder: string
    register: UseFormRegister<any>
    name: string
    errors: FieldErrors<FieldValues>
    lines?: number
    form?: string
    defaultValue?: string
  }

const FormGenerator = ({
    errors,
    inputType,
    name,
    placeholder,
    defaultValue,
    register,
    type,
    form,
    label,
    lines,
    options,
}: Props) => {
    switch (inputType) {
        case 'input':
        default:
            return (
                <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
                {label && label}
                    <Input
                        id={`input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        form={form}
                        defaultValue={defaultValue}
                        {...register(name)}
                    />

                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                        <p className="text-red-400 mt-2">
                            {message === 'Required' ? '' : message}
                        </p>
                        )}
                    />
                    
                </Label>
            )
    }
}

export default FormGenerator