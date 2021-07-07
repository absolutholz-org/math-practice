import React, { useEffect, useState, useMemo } from 'react';
import { debounce } from "lodash";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

enum Operation {
	ADDITION = 1,
	SUBTRACTION = 0,
}

const max = 20;

export const Equation = () => {
	const [ operation, setOperation ] = useState(Operation.ADDITION);
	const [ first, setFirst ] = useState(0);
	const [ second, setSecond ] = useState(0);
	const [ result, setResult ] = useState(0);

	function createEquation (): void {
		const operation = Math.round(Math.random());
		const first = Math.round(Math.random() * max);
		const second = operation === Operation.ADDITION ? Math.round(Math.random() * (max - first)): Math.round(Math.random() * first);
		const result = operation === Operation.ADDITION ? first + second : first - second;

		setOperation(operation);
		setFirst(first);
		setSecond(second);
		setResult(result);
	}

	function onInput (event: InputEvent): void {
		const solution = parseInt(event.target.value);
		if (solution === result) {
			console.log('good job');
		} else {
			console.log('try again');
		}
	}

	const debounceOnInput = useMemo(() => debounce(onInput, 1000), []);

	useEffect(() => {
		createEquation();

		return () => {
			debounceOnInput.cancel();
		}
	}, []);

	return (
		<form>
			<div>
				{ first } { operation === Operation.ADDITION ? '+' : '-' } { second }
			</div>
			<div>
				= <input
					inputMode="numeric"
					onChange={ debounceOnInput }
					type="number"
				/>
			</div>
		</form>
	);
}
