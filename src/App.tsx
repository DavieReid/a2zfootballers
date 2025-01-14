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
			<div className="name">Jack's game</div>
			<div>
				<img className="logo" src={football} alt="Vite logo" />
			</div>
			<h1>A 2 Z Footballers</h1>
			<div className="card">
				{isComplete ? (
					<div>All Done...well played!</div>
				) : (
					<div>
						Current Letter:{" "}
						<span className="currentLetter">{currentLetter}</span>
					</div>
				)}
			</div>
			<div className="card">
				<input
					className={classnames({ shake: status === "incorrect" })}
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					readOnly={isComplete}
				/>
			</div>
			<div className="card">
				<Button onClick={handleClick} disabled={isComplete}>
					Guess
				</Button>
				<Button onClick={handleRestart}>Restart</Button>
			</div>
			<div className="card">
				<ul>
					{answers.map((answer) => (
						<li key={answer.letter}>
							{answer.letter} - {answer.footballer}
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}

export default App;
