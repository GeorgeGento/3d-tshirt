import { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../utils'

const buttonVariants = cva(
    "flex-1 rounded-md w-fit px-4 py-2.5 font-bold text-sm",
    {
        variants: {
            variant: {
                default: "flex items-center gap-2 bg-black hover:bg-gray-400 p-2 rounded-md text-white hover:text-black",
                filled: `text-[#fff] bg-[#EFBD48]`,
                outline: "border-[1px] border-color-[#EFBD48] text-[#fff]"
            },
            size: {
                default: "h-10 py-1.5 px-2"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {

} & VariantProps<typeof buttonVariants>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ size, variant, className }))}
            {...props}
        />
    )
})

export { Button, buttonVariants }