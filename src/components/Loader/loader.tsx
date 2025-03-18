import { HTMLAttributes, forwardRef } from "react"
import { VariantProps } from "tailwind-variants"
import { loaderVariants } from "./loader.styles"

export type LoaderProps = HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof loaderVariants>

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <div
        className={loaderVariants({ variant, size, className })}
        style={{ borderInlineEndColor: 'transparent' }}
        ref={ref}
        role="status"
        {...props}
      >
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    )
  }
)

Loader.displayName = 'Loader'