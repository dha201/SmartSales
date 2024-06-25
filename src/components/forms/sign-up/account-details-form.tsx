import { USER_REGISTRATION_FORM } from '@/constants/forms'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

type Props = {
    // register is a function that registers an input element to the form context.
    // UseFormRegister<> is a generic type that accepts the type of the form values.
    // FieldValues is a generic type for both UseFormRegister and FieldErrors, 
    // which catch-all type that can represent any form values.
    // By typing it as UseFormRegister<FieldValues>, we're saying this component expects to receive the register function that can work with any field values.
    register: UseFormRegister<FieldValues> 
    errors: FieldErrors<FieldValues>
}

const AccountDetailForm = (props: Props) => {
  return (
    <>
        <h2 className="text-gravel md:text-4xl font-bold">Account
        details</h2>
        <p className="text-iridium md: text-sm">Enter your email and password</p>
        {USER_REGISTRATION_FORM.map((field) => (
            <FormGenerator
                key={field.id}
                {... field}
                errors={errors}
                register={register}
                name={field.name}
            />
        ))}
    </>
  )
}

export default AccountDetailForm