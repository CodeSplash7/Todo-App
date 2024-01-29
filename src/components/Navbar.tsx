import { authFormActions } from "../state/slices/authFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { logOut } from "../state/slices/userSlice";

const Navbar = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const loggedIn = username !== null;

  return (
    <div className="border-b-[2px] w-full h-fit flex px-[32px] py-[8px] gap-[16px] items-center">
      {!loggedIn && (
        <>
          <LoginBtn />
          <RegisterBtn />
          <div className="text-white">{username}</div>
        </>
      )}
      {loggedIn && <LogOutBtn />}
    </div>
  );
};

const LoginBtn = () => {
  const dispatch = useDispatch();
  const { toggleAuthForm, setPurpose } = authFormActions;
  return (
    <div
      onClick={() => {
        dispatch(toggleAuthForm());
        dispatch(setPurpose("log"));
      }}
      className="bg-blue-500 py-[8px] px-[16px] rounded"
    >
      Log In
    </div>
  );
};

const LogOutBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      onClick={() => {
        dispatch(logOut());
      }}
      className="bg-blue-500 py-[8px] px-[16px] rounded"
    >
      Log out
    </div>
  );
};

const RegisterBtn = () => {
  const dispatch = useDispatch();
  const { toggleAuthForm, setPurpose } = authFormActions;
  return (
    <div
      onClick={() => {
        dispatch(toggleAuthForm());
        dispatch(setPurpose("register"));
      }}
      className="bg-blue-500 py-[8px] px-[16px] rounded"
    >
      Register
    </div>
  );
};

export default Navbar;
