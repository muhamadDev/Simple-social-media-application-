"use client"
// TODO: THIS COMPONENT NEVER REANDER IT'S JUST A SMAPLE OF HOW TO USE "react-intersection-observer" TO MAKE A LAZY LOADING COMPONENT
// loop throw an array and return this component
// and dont forget to replace loading... to a skeleton component
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from 'react';

export default function Card({data}) {
	const [isVisable, setIsVisable] = useState(false);
	
	const { ref, inView, entry } = useInView({
		/* Optional options */
		// triggerOnce: true,
		rootMargin: "-250px",
		threshold: 0,
		
	});

	useEffect(() => { 
		if (inView) {
			setIsVisable(true)
		} else {
			setIsVisable(false)
		}
		
	}, [inView])
	
	return (
		<div ref={ref}>
			{
				isVisable ?
				<div className="bg-blue-400 h-[70px] w-64">{data.body}</div> : 
				<div>loading...</div>
			}
		</div>
	)
}
