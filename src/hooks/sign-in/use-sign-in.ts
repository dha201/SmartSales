/**
 * Manages form state
 * Handles form validation
 * Provides form submission logic
 * Manages any related UI states (like loading)
 */
import { useToast } from '@/components/ui/use-toast';
import { UserLoginSchema, UserLoginProps } from '@/schemas/auth.schema'; 
import { useSignIn } from '@clerk/nextjs'; 
import { zodResolver } from '@hookform/resolvers/zod'; 
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import {useForm} from 'react-hook-form';

export const useSignInForm = () => {
    const {isLoaded, setActive, signIn } = useSignIn(); // Clerk hook for handling sign-in functionality
    const [ loading, setLoading ] = useState<boolean>(false); // Manages loading state
    const router = useRouter(); // Next.js hook for routing
    const { toast } = useToast(); // Custom hook for displaying toast notifications

    /**
     * Manages form state and validation
     * This methods object contains all the form-related methods and state needed to manage the form. 
     * Such as:
     *  register: A function to register form inputs with the form
     *            and returns an object with several properties including:
     *                  - name
     *                  - onchange
     *                  - ref
     *                  - onBlur, etc.
     *  handleSubmit: A function to handle form submission.
     *  formState: An object containing the form's state, such as errors, touched fields, etc.
     *  setValue: A function to set the value of a form field.
     *  getValues: A function to get the current values of the form fields.
     *  reset: A function to reset the form to its initial state.
     * 
     * Configure the useForm hook with the following options:
     */
    const methods = useForm<UserLoginProps>({ 
        resolver: zodResolver(UserLoginSchema),
        mode: 'onChange',
    })

    /**
     * Uses Clerk's signIn.create method to authenticate user.
     * if authentication is successful, it sets the active session and redirects the user to the dashboard.
     * If there's an error, display it as a toast notification.
     */
    const onHandleSubmit = methods.handleSubmit(
        async(values: UserLoginProps) => {
        if(!isLoaded) return

        try{
            setLoading(true);
            const authenticated = await signIn.create({
                identifier: values.email,
                password: values.password,
            })

            if(authenticated){
                await setActive( {session: authenticated.createdSessionId} );
                toast({
                    title: 'Success',
                    description: 'Welcome back! Redirecting you to the dashboard.'
                })
                router.push('/dashboard');
            } 
        } catch(error: any) {
            setLoading(false);
            if(error.errors[0].code === 'form_password_incorrect') {
                toast({
                    title: 'Error',
                    description: 'email or password is incorrect. Please try again.'
                })
            }
        }
    });
    
    return{
        methods,
        onHandleSubmit,
        loading,
    } 
}

