import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CopyActionButtonProps {
  copied: boolean;
  onCopy: () => void;
  label: string;
  copiedLabel: string;
  title?: string;
}

export function CopyActionButton({
  copied,
  onCopy,
  label,
  copiedLabel,
  title,
}: CopyActionButtonProps) {
  return (
    <Button
      onClick={onCopy}
      className="flex-1"
      title={title}
      variant={copied ? 'active' : 'default'}
      icon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}
