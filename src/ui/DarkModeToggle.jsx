import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useEffect } from "react";

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        if(isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    }, [isDarkMode])

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            { isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon/>}
        </ButtonIcon>
    );
};

export default DarkModeToggle;