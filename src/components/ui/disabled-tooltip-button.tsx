import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface DisabledTooltipButtonProps
  extends React.ComponentProps<typeof Button> {
  tooltip: string;
  children: React.ReactNode;
}

export function DisabledTooltipButton({
  tooltip,
  children,
  ...props
}: DisabledTooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block">
          <Button disabled {...props}>
            {children}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
