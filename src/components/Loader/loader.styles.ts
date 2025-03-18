import { tv } from "tailwind-variants";


export const loaderVariants = tv({
	base: 'inline-block size-8 animate-spin rounded-full border-4 border-solid border-current align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
	variants: {
		variant: {
			primary: [
				'text-lime-300'
			],
			secondary: [
				'text-zinc-800'
			]
		},
		size: {
			sm: [
				'size-4'
			],
			md: [
				'size-6'
			],
			lg: [
				'size-8'
			]
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md'
	}
})