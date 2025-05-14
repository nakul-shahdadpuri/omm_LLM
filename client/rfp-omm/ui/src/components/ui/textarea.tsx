type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
    />
  );
}
