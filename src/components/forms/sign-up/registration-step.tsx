/**
 * This RegistrationFormStep component manages different steps of a multi-step registration form.
 * It renders different form components based on the current step of the registration process.
 *
 * The component performs the following steps:
 * 1. Retrieves form context using useFormContext hook from react-hook-form.
 * 2. Accesses the current step from the authentication context.
 * 3. Manages local state for OTP and user type.
 * 4. Updates the form value for 'otp' using setValue.
 * 5. Renders different form components based on the current step using a switch statement.
 *
 * Key features:
 * - Utilizes react-hook-form for form state management.
 * - Integrates with the authentication context to determine the current step.
 * - Provides a modular approach to rendering different steps of the registration process.
 * - Allows for easy expansion of the registration process by adding more cases to the switch statement.
 */

'use client';
import React, {useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { useAuthContextHook } from '@/context/use-auth-context';
import TypeSelectionForm from './type-selection-form'; 


type Props = {}

const RegistrationFormStep = (props: Props) => {

    // 1. Retrieve form context using useFormContext hook
    const {
        register,
        formState: { errors },
        setValue,
    } = useFormContext();


    // 2. Access the current step from the authentication context
    const { currentStep } = useAuthContextHook();

    // 3. Manage local state for OTP and user type
    const [onOTP, setOnOTP] = useState<string>('');
    const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner');
    setValue('otp', onOTP);

    // 5. Render different form components based on the current step
    switch(currentStep){
        case 1: 
            return (
                <TypeSelectionForm
                    register={register}
                    userType={onUserType}
                    setUserType={setOnUserType}
                />
            )
        case 2:
        case 3:
    }

  return (
    <div>registration-step</div>
  )
}

export default RegistrationFormStep