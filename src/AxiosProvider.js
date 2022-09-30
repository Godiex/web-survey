import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./store/auth/actions";

// eslint-disable-next-line react/prop-types
const AxiosProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { message, open } = useSelector(({ loadingDialog }) => loadingDialog);
  const storeChanges = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token && !["/login"].includes(window.location.pathname)) {
      dispatch(logout());
      navigate("../", { replace: true });
    }
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener("storage", storeChanges);
    storeChanges();
    return () => window.removeEventListener("storage", storeChanges);
  }, [storeChanges]);
  return (
    <>
      {children}
      {/* <Loading open={open} message={message} /> */}
    </>
  );
};

export default AxiosProvider;
