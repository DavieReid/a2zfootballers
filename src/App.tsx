import {
	type ChangeEvent,
	type KeyboardEvent,
	useEffect,
	useRef,
	useState
} from "react";

import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Input } from "./components/Input/Input";
import { AnswerList } from "./components/AnswerList/AnswerList";
import { AnswerListOption } from "./components/AnswerList/AnswerListOption";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { useGameState } from "./store";
import { checkAnswer } from "./utils/checkAnswer";

function App() {
	const { currentLetter, answerStatus: status, setStatus, restart, answers, next } = useGameState();
	const [value, setValue] = useState("");
	const isComplete = answers.length === 26;
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAttempt = () => {
		if (checkAnswer(value, currentLetter)) {
			next(value);
			setValue("")
		}
		else {
			setStatus("Incorrect");
		}
	}

	const handleRestart = () => {
		restart();
		inputRef.current?.focus();
	};

	const handleClick = () => {
		handleAttempt()
		inputRef.current?.focus();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleAttempt();
		}
	};

	return (
		<>
			<Header />
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
									status={status || ""}
									value={value}
								/>
							</Card>
						</>
					) : null}
					<div>
						<Button onClick={handleClick} disabled={isComplete}>
							Guess
						</Button>
						<Button onClick={handleRestart} disabled={currentLetter === "a"}>
							Restart
						</Button>
					</div>
				</section>
				<section className={styles["answer-area"]}>
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

				</section>
			</main>
		</>
	);
}

export default App;
