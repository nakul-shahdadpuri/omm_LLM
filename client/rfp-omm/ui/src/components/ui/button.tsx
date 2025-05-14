type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'icon';
  variant?: 'outline' | 'ghost';
};

export function Button({ size, variant, className = '', ...props }: ButtonProps) {
  const sizeClasses = size === 'icon'
    ? 'p-2'
    : size === 'sm'
    ? 'px-3 py-1.5 text-sm'
    : 'px-4 py-2';

  const variantClasses = variant === 'outline'
    ? 'border border-gray-300 bg-white hover:bg-gray-100'
    : variant === 'ghost'
    ? 'bg-transparent hover:bg-gray-100'
    : 'bg-gray-100 hover:bg-gray-200';

  return (
    <button
      {...props}
      className={`${sizeClasses} ${variantClasses} rounded-md font-medium ${className}`}
    />
  );
}
