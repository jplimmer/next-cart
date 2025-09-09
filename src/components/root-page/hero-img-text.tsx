export default function HeroImgText({ text }: { text: string }) {
  return (
    <span className="bg-green-950/80 p-3 z-10 absolute left-1 top-1">
      {text}
    </span>
  );
}
