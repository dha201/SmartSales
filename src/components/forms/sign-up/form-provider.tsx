import React from 'react';
import {  AuthContextProvider } from '@/context/use-auth-context';
import { FormProvider } from 'react-hook-form';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import { Loader } from '@/components/loader';

type Props = {
    children: React.ReactNode;  
}

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