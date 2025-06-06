export function incrementLetter(letter: string) {
	let unicodeValue = letter.charCodeAt(0);
	unicodeValue++;
	return String.fromCharCode(unicodeValue);
}
