"use client"

import { useState } from "react";
import { IconAdd } from "./IconAdd";

const questions = [
	{
		question: "What do I need to start an Plendify shop?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "What can I sell on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "How much does it cost to sell on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "How do I contact Plendify support?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "Do I need to charge sales tax on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "What is a SKU, and how do I use it on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "How can I optimize my listings for Plendify search?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "How do reviews work on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "How do I handle shipping on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "Do I need a business license to sell on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "How long does it take to make money on Plendify?",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	},
	{
		question: "Additional Tips for Plendify sellers",
		answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nemo. Placeat neque explicabo tenetur labore quia, facilis perspiciatis nobis libero ex ipsum rem nostrum sequi, dolorum sunt? Saepe, dignissimos ex. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci debitis delectus tempore natus nam repellat neque dolor officia vero sit, tenetur consectetur dicta incidunt! Minima corporis accusantium at quae doloremque."
	}
];

export const FAQ = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	function ToggleAnswer(index: number) {
		setOpenIndex(openIndex === index ? null : index);
	}

	return (
		<section className='w-full h-auto py-36 bg-gray-50 border border-gray-100'>
			<div className="mx-auto max-w-7xl px-16">
				<div className="w-full mx-auto flex flex-col gap-y-8">
					<div className="mb-12">
						<h1 className="text-4xl text-center font-extrabold">
							Frequently Asked Questions
						</h1>
					</div>
					<div>
						<ul className="[&>li]:mb-4">
							{questions.map((q, index) => (
								<li
									key={index}
									onClick={() => { ToggleAnswer(index) }}
									className="border border-gray-300 rounded-xl p-8 text-2xl cursor-pointer">
									<div className="flex justify-between items-center">
										<span>{q.question}</span>
										<IconAdd />
									</div>
									{
										openIndex === index && (<p className="text-lg mt-4 text-gray-600">{q.answer}</p>)
									}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
