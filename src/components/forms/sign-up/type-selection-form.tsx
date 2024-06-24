/**
 * TypeSelectionForm Component
 * 
 * This component renders a form for selecting the user type during the registration process.
 * It displays a title, description, and two UserTypeCard components for different user types.
 *
 * The component performs the following steps:
 * 1. Receives props for form registration, current user type, and a function to update user type.
 * 2. Renders a heading and description for the user type selection.
 * 3. Renders two UserTypeCard components, one for "Business Owner" and one for "Student".
 * 4. Passes necessary props to each UserTypeCard for handling selection and registration.
 *
 * Key features:
 * - Utilizes react-hook-form for form registration.
 * - Allows selection between two user types: "owner" and "student".
 * - Provides a clean and intuitive interface for user type selection.
 */

import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card';

type Props = {
    register: UseFormRegister<FieldValues>;
    userType: 'owner' | 'student';
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>;
}

const TypeSelectionForm = ({register, userType, setUserType}: Props) => {
    return(
        <>
            <h2 className="text-gravel md: text-4xl font-bold">Create an account</h2>
            <p className="text-iridium d:text-sm">
                Tell us about yourself! What do you do? Let&apos;s tailor your
                <br /> experience so it best suits you.
            </p>
            <UserTypeCard
                register={register}
                setUserType={setUserType}
                userType={userType}
                value="owner"
                title="I'm a Business Owner"
                text="I want to grow my business"    
            />
            <UserTypeCard
                register={register}
                setUserType={setUserType}
                userType={userType}
                value="student"
                title="I'm a Student"
                text="Looking to learn about the tool"    
            />
        </>
    )
}

export default TypeSelectionForm