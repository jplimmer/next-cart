interface LoadingSpinnerProps {
  text?: string;
  spinnerBorder?: string;
  className?: string;
}

export function LoadingSpinner({
  text = 'Loading...',
  spinnerBorder = 'border-2 border-indigo-300',
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center gap-4 ${className}`}>
      {text}
      <div
        className={`h-4 w-4 animate-spin rounded-full ${spinnerBorder} border-t-transparent`}
      ></div>
    </div>
  );
}
