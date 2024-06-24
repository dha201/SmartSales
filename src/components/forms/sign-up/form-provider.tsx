/**
 * 'SignupFormProvider' ultilizes {FormProvider} from 'react-hook-form' to:
 * Provides access to the form's state and methods from any component within the form
 * and interact with form data, validation state, and form submission without prop drilling. 
 * 
 * RegistrationFormStep and ButtonHandler are the child which uses useFormContext to access the form state and methods.
 */

'use client';
import React from 'react';
import {  AuthContextProvider } from '@/context/use-auth-context';
import { FormProvider } from 'react-hook-form';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import { Loader } from '@/components/loader';

type Props = {
    children: React.ReactNode;  
}

/**
 * This component serves as a wrapper for the signup form, managing the entire signup process
 * and providing form context to child components.
 *
 * The component performs the following steps:
 * 1. Initializes the signup form using the useSignUpForm custom hook.
 * 2. Sets up the AuthContextProvider to manage authentication state.
 * 3. Utilizes FormProvider to pass form methods and state to child components.
 * 4. Creates a form element with the onSubmit handler from useSignUpForm.
 * 5. Wraps children components with a Loader to handle loading states.
 * 6. Renders child components, allowing them to access form context.
 *
 * Key features:
 * - Provides centralized form state management using react-hook-form.
 * - Enables easy access to form methods and state for all child components.
 * - Handles form submission and loading states.
 * - Integrates with the authentication context for broader state management.
 */
const SignupFormProvider = ( {children} : Props) => {
  const { methods, onHandleSubmit, loading} = useSignUpForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className='h-full'> 
          <div className='h-full'>
            <Loader loading={loading}> 
              {children}
            </Loader>
          </div>
        </form>
      </FormProvider>  
    </AuthContextProvider>
  )
}

export default SignupFormProvider