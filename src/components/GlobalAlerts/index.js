import { useAlert } from "react-alert";
import { setErrorMessage } from "../../store/error/action";
import { useDispatch } from "react-redux";

function GlobalAlert({ message }) {
  const dispatch = useDispatch();
  dispatch(setErrorMessage(message));
}

export default GlobalAlert;
