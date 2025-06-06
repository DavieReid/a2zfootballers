import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createSelectors } from "./selectors";
import { incrementLetter } from "../utils/incrementLetter";

const GAME_STATE_LOCAL_STORAGE_KEY = "a2z-game-state";

type AnswerStatus = "Correct" | "Incorrect" | null;

type Answer = {
	letter: string;
	footballer: string;
};

export interface GameState {
	playerCount: number;
	currentLetter: string;
	answerStatus: AnswerStatus;
	answers: Array<Answer>;
}

const initialState: GameState = {
	playerCount: 1,
	answerStatus: null,
	currentLetter: "a",
	answers: []
};

export type GameActions = {
	setCurrentLetter: (currentLetter: string) => void;
	setStatus: (status: AnswerStatus) => void;
	addAnswer: (answer: string) => void;
	restart: () => void;
	next: (footballerName: string) => void;
};

const useStoreBase = create<GameState & GameActions>()(
	persist(
		devtools((set, get) => ({
			...initialState,
			setStatus: (status: AnswerStatus) => set({ answerStatus: status }),
			restart: () => set({ ...initialState }),
			next: (footballerName: string) => {
				const { currentLetter, answers } = get();

				const answer: Answer = {
					letter: currentLetter,
					footballer: footballerName
				};

				set({
					answers: [...answers, answer],
					currentLetter:
						currentLetter !== "z"
							? incrementLetter(currentLetter)
							: currentLetter
				});
			}
		})),
		{ name: GAME_STATE_LOCAL_STORAGE_KEY }
	)
);

const useGameState = createSelectors(useStoreBase);

export { useGameState };
