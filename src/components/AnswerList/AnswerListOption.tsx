import type { Answer } from "../../App";
import styles from "./AnswerList.module.css";
export interface AnswerListOptionProps {
	answer: Answer;
	children: React.ReactNode;
}

export const AnswerListOption = ({ children }: AnswerListOptionProps) => {
	return <li className={styles.option}>{children}</li>;
};
