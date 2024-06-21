'use client';
import React, {useState} from 'react'

type InitialValuesProps = {
    //setCurrentStep: accepts a number and returns void
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>; 
}

const InitialValues: InitialValuesProps = {
    currentStep: 1,
    setCurrentStep: () => undefined,
}

/**
 * Refresher: Context provides a way to pass data through the component treem, avoiding props drilling.
 * 
 * Provider Component: The Provider component is used to wrap the part of your application where you want the context to be available.
 * It accepts a value prop, which is the data you want to make available to the components within the Provider.
 * 
 * Consumer Component: The Consumer component is used to access the context data. It requires a function as a child, which receives the context value as an argument.
 */
const authContext = React.createContext(InitialValues);

/**
 * The AuthContextProvider component is responsible for providing the authentication context to its child components.
 * It initializes the `currentStep` state and exposes it along with the `setCurrentStep` function through the authentication context.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will receive the authentication context.
 * @returns {React.ReactElement} - The AuthContextProvider component.
 */
const {Provider} = authContext;
export const AuthContextProvider = ({children} : {children : React.ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<number>(InitialValues.currentStep);
    const values = {currentStep, setCurrentStep};
    return <Provider value={values}> {children} </Provider>;
}

/**
 * Any component that needs access to the currentStep or setCurrentStep can use the useAuthContext hook.
 * This hook provides an easy way to access the context values.
 * @returns {InitialValuesProps} - An object containing the current step and a function to update the current step.
 */
export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
