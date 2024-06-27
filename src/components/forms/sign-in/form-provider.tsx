/**
 * Wrapper for handling form state, validation, and submission logic for the sign-in process.
 * 1. Form State Management: It uses react-hook-form to manage form state efficiently, reducing unnecessary re-renders and providing a smooth user experience.
 * 2. Context Provision: It sets up a context that can be used by child components to access form-related data and functions without prop drilling.
 * 3. Loading State Handling: It manages and displays a loading state during form submission
 */

'use client';
import { Loader } from '@/components/loader'
import { AuthContextProvider } from '@/context/use-auth-context'
import { useSignInForm } from '@/hooks/sign-in/use-sign-in'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
    /**
     * "children" is a special prop that allows components to be nested inside other components. It represents the content between the opening and closing tags of a component when it's used.
     * For example, if you have a component like this:
        <SignInFormProvider>
            <LoginForm />
            <RememberMeCheckbox />
            <SubmitButton />
        </SignInFormProvider>
     *  The <LoginForm />, <RememberMeCheckbox />, and <SubmitButton /> components are considered the "children" of SignInFormProvider.
     */
    children: React.ReactNode
}

const SignInFormProvider = ({ children }: Props) => {
    const { methods, onHandleSubmit, loading } = useSignInForm()
  
    return (
      <AuthContextProvider>
        <FormProvider {...methods}>
          <form onSubmit={onHandleSubmit} className="h-full">
            <div className="flex flex-col justify-between gap-3 h-full">
              <Loader loading={loading}>
                {children}
              </Loader>
            </div>
          </form>
        </FormProvider>
      </AuthContextProvider>
    )
}

export default SignInFormProvider