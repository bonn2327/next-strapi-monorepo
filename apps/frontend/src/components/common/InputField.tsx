import { forwardRef } from 'react';
import { IconType } from 'react-icons';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: IconType;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ id, label, type, placeholder, icon: Icon, error, ...props }, ref) => (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="text-gray-400" />
        </div>
        <input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          className={`w-full pl-10 pr-3 py-2 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);