import classnames from "clsx";
import {
	type ChangeEvent,
	type KeyboardEvent,
	useEffect,
	useState
} from "react";
import football from "./assets//football.svg";
import "./App.css";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";

type Answer = {
	letter: string;
	footballer: string;
};

function incrementLetter(letter: string) {
	let unicodeValue = letter.charCodeAt(0);
	unicodeValue++;
	return String.fromCharCode(unicodeValue);
}

function App() {
	const [currentLetter, setCurrentLetter] = useState("a");
	const [value, setValue] = useState("");
	const [status, setStatus] = useState("");
	const [answers, setAnswers] = useState<Answer[]>([]);
	const isComplete = currentLetter === "z";

	function checkAnswer() {
		const words = value.toLowerCase().split(" ");
		const valid = words.filter((word) => word.startsWith(currentLetter));

		if (valid.length !== 0) {
			setStatus("Correct");
			setValue("");
			setAnswers((prevState) => [
				...prevState,
				{ letter: currentLetter, footballer: value }
			]);
			if (currentLetter !== "z") {
				setCurrentLetter(incrementLetter(currentLetter));
			}
		} else {
			setStatus("incorrect");
		}
	}

	const handleRestart = () => {
		setAnswers([]);
		setCurrentLetter("a");
		setStatus("");
	};

	const handleClick = () => {
		checkAnswer();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			checkAnswer();
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (status !== "") {
				setStatus("");
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [status]);

	return (
		<main>
			<img className="logo" src={football} alt="Vite logo" />
			<Card>
				<h1>A 2 Z Footballers by Jack Reid</h1>
			</Card>
			<Card variant="letter">{currentLetter}</Card>
			<Card>{isComplete ? <div>All Done...well played!</div> : null}</Card>
			<Card>
				<input
					className={classnames({ shake: status === "incorrect" })}
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					readOnly={isComplete}
				/>
			</Card>
			<Card>
				<Button onClick={handleClick} disabled={isComplete}>
					Guess
				</Button>
				<Button onClick={handleRestart} disabled={currentLetter === "a"}>
					Restart
				</Button>
			</Card>
			<Card>
				<ul>
					{answers.map((answer) => (
						<li key={answer.letter}>
							{answer.letter} - {answer.footballer}
						</li>
					))}
				</ul>
			</Card>
		</main>
	);
}

export default App;
