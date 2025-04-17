import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path
      fill="#EA4335"
      d="M24 9.5c3.48 0 6.36 1.23 8.5 3.28l6.44-6.44C34.98 2.67 29.9 0 24 0 14.59 0 6.82 5.45 3.03 13.12l7.7 5.96C12.43 13.4 17.8 9.5 24 9.5z"
    ></path>
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.14-3.08-.4-4.55H24v8.51h12.92c-.58 2.76-2.32 5.1-4.8 6.69l7.37 5.71C44.1 37.18 46.98 31.35 46.98 24.55z"
    ></path>
    <path
      fill="#FBBC05"
      d="M10.73 28.08c-.45-1.35-.7-2.78-.7-4.28s.25-2.93.7-4.28l-7.7-5.96C1.12 16.26 0 20.03 0 24c0 3.97 1.12 7.74 3.03 10.88l7.7-5.8z"
    ></path>
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.37-5.71c-2.11 1.42-4.82 2.28-7.92 2.28-6.2 0-11.57-3.9-13.5-9.18l-7.7 5.96C6.82 42.55 14.59 48 24 48z"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

type GoogleLoginButtonProps = {
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // Allow other standard button props if needed
  [key: string]: any;
};

export default function CustomGoogleLoginButton({
  isLoading,
  children = 'Google 계정으로 로그인', // Default text
  className,
  disabled,
  ...props
}: GoogleLoginButtonProps) {
  const buttonClass = clsx(
    // Base styles matching SubmitButton's structure, but different colors
    'w-full h-12 px-6 text-lg font-medium', // Adjusted font size slightly, full width common for forms
    'border border-gray-300 bg-white text-gray-700', // Google-like colors: white bg, gray text/border
    'rounded-xl shadow-sm', // Slightly less prominent shadow than orange button
    'transition-all',
    'hover:bg-gray-50 hover:shadow-md', // Subtle hover
    'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2', // Google-ish blue focus ring
    {
      'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:border-gray-200':
        disabled || isLoading, // Consistent disabled state styling approach
    },
    className // Allow overrides
  );

  return (
    <Button
      type="button" // Important: prevent form submission if inside a form
      className={buttonClass}
      onClick={() => !isLoading} // Trigger Google Login on click if not loading
      disabled={isLoading || disabled}
      {...props} // Spread remaining props
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" /> // Slightly smaller loader to fit well
      ) : (
        <div className="flex items-center justify-center gap-2">
          <GoogleIcon className="h-5 w-5" /> {/* Google Icon */}
          <span>{children}</span> {/* Button Text */}
        </div>
      )}
    </Button>
  );
}
