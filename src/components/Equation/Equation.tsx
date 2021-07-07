import React, { useEffect, useState, useRef } from 'react';
// import { debounce } from "lodash";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

enum Operation {
	ADDITION = 1,
	SUBTRACTION = 0,
}

enum State {
	NOT_STARTED = 0,
	WAITING = 1,
	INCORRECT = 2,
	CORRECT = 3,
}

const max = 20;

export const Equation = () => {
	const [ state, setState ] = useState(State.NOT_STARTED)
	const [ operation, setOperation ] = useState(Operation.ADDITION);
	const [ first, setFirst ] = useState(0);
	const [ second, setSecond ] = useState(0);
	const [ result, setResult ] = useState(0);
	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

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
		console.log({solution, result, first, second});
		if (solution === result) {
			setState(State.CORRECT);
			console.log('good job');
		} else {
			setState(State.INCORRECT);
			console.log('try again');
		}
	}

	function onNext (event: ButtonEvent): void {
		createEquation();
		formRef.current?.reset();
		inputRef.current?.focus();
	}

	function onTryAgain (event: ButtonEvent): void {
	}

	useEffect(() => {
		createEquation();

		// return () => {
		// 	debounceOnInput.cancel();
		// }
	}, []);

	useEffect(() => {
		setState(State.WAITING);
	}, [ result ]);

	return (
		<form ref={ formRef }>
			<div>
				{ first } { operation === Operation.ADDITION ? '+' : '-' } { second }
			</div>
			<div>
				= <input
					inputMode="numeric"
					onChange={ onInput }
					ref={ inputRef }
					type="number"
				/>
			</div>

			{ state === State.CORRECT &&
				<div>
					Correct!
					<button onClick={ onNext } type="button">Next</button>
				</div>
			}

			{ state === State.INCORRECT &&
				<div>
					Incorrect!
					<button onClick={ onTryAgain } type="button">Try again</button>
				</div>
			}
		</form>
	);
}
