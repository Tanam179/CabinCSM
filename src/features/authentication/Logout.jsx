import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "../../hooks/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
    const { logout, isPending } = useLogout();

    return (
        <ButtonIcon disabled={isPending} onClick={() => logout()}>
           { !isPending ? <HiArrowRightOnRectangle/> : <SpinnerMini/>}
        </ButtonIcon>
    );
};

export default Logout;