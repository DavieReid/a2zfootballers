import type { ChangeEventHandler } from "react";
import { useGameState } from "../../store";
import styles from "./Switch.module.css";

export interface SwitchProps {
	disabled: boolean;
}

export const Switch = ({ disabled }: SwitchProps) => {
	const { playerCount, setPlayerCount } = useGameState();

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		if (event.nativeEvent.defaultPrevented) {
			return;
		}
		const value = event.target.checked;
		setPlayerCount(value ? 2 : 1);
	};

	return (
		<div className={styles.root}>
			<label htmlFor="player-count-switch">2 Player?</label>
			<input
				id="player-count-switch"
				aria-checked={playerCount === 2}
				type="checkbox"
				role="switch"
				onChange={handleChange}
				checked={playerCount === 2}
				disabled={disabled}
			/>
		</div>
	);
};
