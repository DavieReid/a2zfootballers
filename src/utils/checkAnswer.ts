export function checkAnswer(attempt: string, currentLetter: string) {
	const words = attempt.toLowerCase().split(" ");
	const valid = words.filter((word) => word.startsWith(currentLetter));
	return valid.length !== 0;
}
