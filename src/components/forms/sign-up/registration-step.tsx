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
import { Spinner } from '@/components/spinner';
import dynamic from 'next/dynamic';
const SpinnerWrapper = () => <Spinner />;

// Dynamically import the form components based on the current step for performance.
// The dynamic import loads the component only when it's needed, which can improve initial page load times.
const DetailForm = dynamic(() => import('./account-details-form'), {
    ssr: false, //disables server-side rendering for this component.
    loading: SpinnerWrapper //specifies a component to show while the dynamic import is loading.
}); 

const OTPForm = dynamic(() => import('./otp-form'), {
    ssr: false, //disables server-side rendering for this component.
    loading: SpinnerWrapper //specifies a component to show while the dynamic import is loading.
}); 

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

    /**
     * 5. Render different form components based on the current step
     * step 1:user type selection component
     * step 2:owner registration form
     */
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
            return <DetailForm 
                errors={errors}
                register={register}
            />
        case 3:
            return(
                <OTPForm
                    onOTP={onOTP}
                    setOnOTP={setOnOTP}
                />
            )
    }

  return (
    <div>registration-step</div>
  )
}

export default RegistrationFormStep