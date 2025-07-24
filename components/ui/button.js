import { forwardRef } from "react"

const Button = forwardRef(({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    ghost: "hover:bg-gray-100",
    outline: "border border-gray-300 hover:bg-gray-50",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  }

  const variantStyles = variants[variant] || variants.default
  const sizeStyles = sizes[size] || sizes.default

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} ref={ref} {...props}>
      {children}
    </button>
  )
})

Button.displayName = "Button"

export { Button }
