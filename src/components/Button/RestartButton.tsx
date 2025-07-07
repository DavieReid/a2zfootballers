export interface RestartButtonProps {
    onClick: () => void;
    disabled?: boolean;
}


import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export const RestartButton = ({
    onClick,
    ...restProps
}: RestartButtonProps) => {
    const [restartRequested, setRestartRequested] = useState(false);
    const [count, setCount] = useState(5);
    const intervalRef = useRef<number>(null);


    const handleClick = () => {
        restartRequested ? onClick() : askToConfirm()
    }

    const askToConfirm = () => {
        setRestartRequested(true);
        if (count > 0) {
            intervalRef.current = setInterval(() => {
                setCount(prevCount => prevCount - 1)
            }, 1000)
        }
    };

    useEffect(() => {

        if (count === 0) {
            setRestartRequested(false)
            setCount(5);
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

    }, [count])

    return (
        <Button {...restProps} onClick={handleClick}>{restartRequested ? `Are you sure? (${count}s...)` : 'Restart'}</Button>
    );
};
