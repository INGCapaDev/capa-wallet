import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button-variants';

type ButtonStyleProps = VariantProps<typeof buttonVariants>;

export type ButtonVariant = NonNullable<ButtonStyleProps['variant']>;
export type ButtonSize = NonNullable<ButtonStyleProps['size']>;
export type ButtonShape = NonNullable<ButtonStyleProps['shape']>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: ReactNode;
}

export function Button({
  variant,
  size,
  shape,
  icon,
  children,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    >
      {icon && (
        <span className="shrink-0 flex items-center justify-center text-inherit">
          {icon}
        </span>
      )}
      {children && <span>{children}</span>}
    </button>
  );
}
