import React, { useState, useEffect } from "react";
import { useTimer } from "use-timer"; // https://openbase.com/js/use-timer

interface ITimerProps {
	seconds: number;
	onTimeOver: () => void;
}

export const Timer = ({ seconds, onTimeOver }: ITimerProps) => {
	const { time, start, pause, reset, status } = useTimer({
		endTime: 0,
		initialTime: seconds,
		timerType: "DECREMENTAL",
		onTimeOver,
	});

	const [displayMinutes, setDisplayMinutes] = useState(`00`);
	const [displaySeconds, setDisplaySeconds] = useState(`00`);

	useEffect(() => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		setDisplayMinutes(`${minutes}`);
		setDisplaySeconds(seconds < 10 ? `0${seconds}` : `${seconds}`);
	}, [time]);

	useEffect(() => {
		start();
	}, []);

	return (
		<div>
			{displayMinutes}:{displaySeconds}
		</div>
	);
};
