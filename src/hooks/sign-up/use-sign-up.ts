/**
 * Note next/router traditional used in Next.js 12 and ealier versions.
 * it uses file-based routing system, where each file in the pages directory becomes a route.
 * 
 * A better approach is next/navigation with app directory.
 * it uses folder-based routing system, where each folder in the pages directory becomes a route.
 */
import {useRouter} from 'next/navigation';
import {useToast} from '@/components/ui/use-toast'; //notifications component
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import { useSignUp } from '@clerk/nextjs';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    UserRegistrationSchema,
    UserRegistrationProps,
} from '@/schemas/auth.schema';
import {onCompleteUserRegistration} from '@/action/auth/index';



//Custom Hook for Clerk Authentication. P.S Check note.txt in this folder for more information about schema and useForm().
export const useSignUpForm = () => { 
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp, isLoaded, setActive } = useSignUp();
    const router = useRouter();
    const methods = useForm<UserRegistrationProps>({
        resolver:zodResolver(UserRegistrationSchema),
        // Default values for the form fields
        defaultValues: {
            type: 'owner',
        },
        mode: 'onChange',
    })

    /**
     * Initiates the user registration process and generates an OTP for email verification.
     * 
     * This asynchronous function handles the initial steps of user registration:
     * 1. Creates a new user account with the provided email and password.
     * 2. Prepares the email address for verification by generating an OTP.
     * 3. Advances the registration process to the next step upon success.
    */
    const onGenerateOTP = async (
        email: string,
        password: string,
        onNext: React.Dispatch<React.SetStateAction<number>>) => {
        if(!isLoaded) return
        try{
            // Create a new user account
            await signUp.create({
                emailAddress: email,
                password: password,
            })

            // Prepare the email address for verification
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    
            // onNext: React.Dispatch<React.SetStateAction<number>> is a function that increments the value of the current step and moves the user to the next step.
            onNext((prev) => prev + 1);
        }catch(error : any){
            toast({
                title: 'Error',
                description: error.errors[0].longMessage,
            });
        }
    }


    /**
     * This asynchronous function manages the complete flow of user registration,
     * including email verification, user data submission, and post-registration actions.
     * 
     * The function performs the following steps:
     * 1. Verifies the user's email address using a one-time password (OTP).
     * 2. Completes the user registration process with additional user information.
     * 3. Sets the user's session as active upon successful registration.
     * 4. Redirects the user to the dashboard on successful completion.
     * 5. Handles and displays errors if they occur during the process.
     */
    const onHandleSubmit = methods.handleSubmit(
        async (values: UserRegistrationProps, ) => {
            if(!isLoaded) return
            try{
                setLoading(true);
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: values.otp,
                });

                if(completeSignUp.status !== 'complete'){
                    return {
                        message: 'Something went wrong!'
                    }
                }

                if(completeSignUp.status === 'complete'){
                    if(!signUp.createdUserId) return

                    const registered = await onCompleteUserRegistration(
                        values.fullname,
                        signUp.createdUserId,
                        values.type,
                    )

                    if(registered?.status == 200 && registered.user){
                        await setActive({
                            session: completeSignUp.createdSessionId
                        })
                        setLoading(false);
                        router.push('/dashboard');
                    }

                    if(registered?.status !== 400){
                        toast({
                            title: 'Error',
                            description: 'Something went Wrong!!'
                        })
                    }
                }
            } catch(error: any){ 
                toast({
                    title: 'Error',
                    description: error.errors[0].longMessage,
                });
            };
        }
    )
    return {
        methods,
        onHandleSubmit,
        onGenerateOTP,
        loading,
    }
}
