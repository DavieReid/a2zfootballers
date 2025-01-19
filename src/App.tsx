import {
	type ChangeEvent,
	type KeyboardEvent,
	useEffect,
	useRef,
	useState
} from "react";
import football from "./assets//football.svg";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Input } from "./components/Input/Input";
import { AnswerList } from "./components/AnswerList/AnswerList";
import { AnswerListOption } from "./components/AnswerList/AnswerListOption";
import styles from "./App.module.css";

export type Answer = {
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
	const isComplete = answers.length === 26;
	const inputRef = useRef<HTMLInputElement>(null);

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
		inputRef.current?.focus();
	};

	const handleClick = () => {
		checkAnswer();
		inputRef.current?.focus();
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
		<>
			<header className={styles.header}>
				<img className={styles.logo} src={football} alt="Vite logo" />
				<Card>
					<h1>A 2 Z Footballers by Jack Reid</h1>
				</Card>
			</header>
			<main className={styles.main}>
				<section className={styles["question-area"]}>
					{isComplete ? <Card>All Done...well played!</Card> : null}
					{!isComplete ? (
						<>
							<Card variant="letter">{currentLetter}</Card>{" "}
							<Card>
								<Input
									ref={inputRef}
									onChange={handleChange}
									onKeyDown={handleKeyDown}
									readOnly={isComplete}
									status={status}
									value={value}
								/>
							</Card>
						</>
					) : null}
					<Card>
						<Button onClick={handleClick} disabled={isComplete}>
							Guess
						</Button>
						<Button onClick={handleRestart} disabled={currentLetter === "a"}>
							Restart
						</Button>
					</Card>
				</section>
				<section>
					<Card>
						<h2>Answers</h2>
						<AnswerList>
							{answers.map((answer) => (
								<AnswerListOption key={answer.letter} answer={answer}>
									<Card variant="letter">{answer.letter}</Card>
									<Card variant="letter" className={styles.answer}>
										{answer.footballer}
									</Card>
								</AnswerListOption>
							))}
						</AnswerList>
					</Card>
				</section>
			</main>
		</>
	);
}

export default App;
