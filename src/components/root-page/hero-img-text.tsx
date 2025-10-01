export default function HeroImgText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`hidden sm:block p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base bg-green-950/75 absolute left-1 top-1 ${className}`}
    >
      {text}
    </span>
  );
}
