import { useEffect, useRef } from "react";

const useClickOutside = (close) => {
    const modalContentRef = useRef();

    useEffect(() => {
        const handleClickOutside = function(e) {
            if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
                close();
            }
        }

        document.addEventListener('click', handleClickOutside, true);

        return function() {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [close]);

    return { modalContentRef }
};

export default useClickOutside;