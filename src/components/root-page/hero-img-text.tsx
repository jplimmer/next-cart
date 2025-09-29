export default function HeroImgText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`bg-green-950/75 p-3 absolute left-1 top-1 ${className}`}>
      {text}
    </span>
  );
}
