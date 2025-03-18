import { ComponentProps } from "react"
import { buttonVariants } from "./button.styles"
import { VariantProps } from "tailwind-variants"

type ButtonProps = ComponentProps<'button'>
  & VariantProps<typeof buttonVariants>

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {

  return (
    <button
      {...props}
      className={buttonVariants({ variant, size, className })}
    />
  )
}