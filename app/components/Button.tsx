interface ButtonProps {
	label: string;
}

export const Button = (props: ButtonProps) => {
	return (
		<button className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white gap-x-2 py-3 px-6 rounded-sm cursor-pointer">
			<span>{props.label}</span>
		</button>
	)
}