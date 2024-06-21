import {useToast} from '@/components/ui/use-toast'; //notifications component
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import { useSignUp } from '@clerk/nextjs';
import {UserRegistrationProps} from '@/schemas/auth.schema';
import {zodResolver} from '@hookform/resolvers/zod';
/**
 * Note next/router traditional used in Next.js 12 and ealier versions.
 * it uses file-based routing system, where each file in the pages directory becomes a route.
 * 
 * A better approach is next/navigation with app directory.
 * it uses folder-based routing system, where each folder in the pages directory becomes a route.
 */
import {useRouter} from 'next/navigation';


//Custom Hook for Clerk Authentication. P.S Check note.txt in this folder for more information about schema and useForm().
export const useSignUpForm = () => { 
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp, isLoaded, setActive } = useSignUp();
    const router = useRouter();
    const methods = useForm<UserRegistrationProps>({
        resolver:zodResolver()
    });

}