import styles from "./AnswerList.module.css";
export interface AnswerListProps {
	children: React.ReactNode;
}

export const AnswerList = ({ children, ...restProps }: AnswerListProps) => {
	return (
		<>
			<h1 className={styles.title}>Answers</h1>
			<ul className={styles.list} {...restProps}>
				{children}
			</ul>
		</>
	);
};
