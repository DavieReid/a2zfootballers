import { useEffect } from "react";
import { useGameState } from "../../store";

export function useResetStatus() {
	const { answerStatus: status, setStatus } = useGameState();
	useEffect(() => {
		const timer = setTimeout(() => {
			if (status !== null) {
				setStatus(null);
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [status, setStatus]);
}
