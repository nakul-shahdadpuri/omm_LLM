import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
