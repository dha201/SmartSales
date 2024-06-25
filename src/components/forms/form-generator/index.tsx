/**
 * Provide a switch statement that check the input type. 
 * Then basing on the input type, it will render the appropriate form component.
 */

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'; //provides a component for displaying error messages in forms managed by React Hook Form.
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
                /**
                 * This section renders an input field with a label and error message. 
                 * Note the use of the spread operator with register(name), which is a react-hook-form method for registering inputs. 
                 * The ErrorMessage component is used for displaying validation errors.
                 */
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
            case 'select':
                /**
                 * This renders a select dropdown. 
                 * It maps over the options prop to create option elements.
                 */
                return (
                    <Label htmlFor={`select-${label}`}>
                    {label && label}
                    <select
                        form={form}
                        id={`select-${label}`}
                        {...register(name)}
                    >
                        {options?.length &&
                        options.map((option) => (
                            <option
                            value={option.value}
                            key={option.id}
                            >
                            {option.label}
                            </option>
                        ))}
                    </select>
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
            case 'textarea':
                return (
                    /**
                     * This section renders a textarea element. 
                     * It's similar to the input rendering but uses a different component and includes a rows prop.
                     */
                    <Label
                    className="flex flex-col gap-2"
                    htmlFor={`input-${label}`}
                    >
                    {label && label}
                    <Textarea
                        form={form}
                        id={`input-${label}`}
                        placeholder={placeholder}
                        {...register(name)}
                        rows={lines}
                        defaultValue={defaultValue}
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