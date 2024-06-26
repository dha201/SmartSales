import OTPInput from '@/components/forms/otp';
import React from 'react';


/**
 * Why not just use useState in the child component?
 *      We could use useState in the child component, but then the parent component wouldn't know about changes to the OTP. By lifting the state up to the parent and passing it down as props, we ensure that both parent and child components have access to the same, consistent data.
 * Why use React.Dispatch instead of just Function?
 *      React.Dispatch is more specific. It tells TypeScript (and other developers) that this isn't just any function, but specifically a function used to update React state.
 * What is React.SetStateAction?
 *      React.SetStateAction is a type that represents either a new value or a function to update the existing value. It allows for both these patterns:
 */
type OTPFormProps = {
    onOTP: string;
    setOnOTP: React.Dispatch<React.SetStateAction<string>>;
}

const OTPForm = ({ onOTP, setOnOTP }: OTPFormProps) => {
    return (
      <>
        <h2 className="text-gravel md:text-4xl font-bold">Enter OTP</h2>
        <p className="text-iridium md:text-sm">
          Enter the one time password that was sent to your email.
        </p>
        <div className="w-full justify-center flex py-5">
          <OTPInput
            otp={onOTP}
            setOtp={setOnOTP}
          />
        </div>
      </>
    )
  }

export default OTPForm