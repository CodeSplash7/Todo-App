// dependencies
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
import { useSelector, useDispatch } from "react-redux";
// import types
import { RootState, AppDispatch } from "../state/store";
// import actions
import { authFormActions } from "../state/slices/authFormSlice/authFormSlice";
// import thunks
import { fetchAccountData, createNewAccount } from "../state/thunkActions";

const { resetForm } = authFormActions;

// Authentication form component
const AuthForm = () => {
  const isAuthFormOpen = useSelector(
    (state: RootState) => state.authForm.isAuthFormOpen
  );
  
  const authPurpose = useSelector((state: RootState) => state.authForm.purpose);
  const errorMessage = useSelector(
    (state: RootState) => state.authForm.errorMessage
  );

  return (
    <ReactModal
      isOpen={isAuthFormOpen}
      closeTimeoutMS={1000}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0)"
        },
        content: {
          background: "rgba(0,0,0,0.4)",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "opacity 2000ms ease-in-out"
        }
      }}
    >
      <div className="bg-slate-600 flex flex-col rounded-xl w-1/2 h-fit px-[50px] py-[30px] gap-[10px]">
        {authPurpose === "register" && <UsernameInput />}
        <EmailInput />
        <PwdInput />
        <FormButtons />
        <p>{errorMessage}</p>
      </div>
    </ReactModal>
  );
};

const UsernameInput = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.authForm.username);
  const { setFormUsername: setUsername } = authFormActions;

  return (
    <div className="w-[100%] flex flex-col">
      <label htmlFor="username-input">Username: </label>
      <input
        value={username}
        onChange={(e) => dispatch(setUsername(e.target.value))}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        type="email"
        id="username-input"
      />
    </div>
  );
};

const EmailInput = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.authForm.email);
  const { setFormEmail } = authFormActions;

  return (
    <div className="w-[100%] flex flex-col">
      <label htmlFor="email-input">Email: </label>
      <input
        value={email}
        onChange={(e) => dispatch(setFormEmail(e.target.value))}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        type="email"
        id="email-input"
      />
    </div>
  );
};

const PwdInput = () => {
  const dispatch = useDispatch();
  const pwd = useSelector((state: RootState) => state.authForm.password);
  const { setFormPwd } = authFormActions;

  return (
    <div className="w-[100%] flex flex-col">
      <label htmlFor="pwd-input">Password: </label>
      <input
        value={pwd}
        onChange={(e) => dispatch(setFormPwd(e.target.value))}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        type="password"
        id="pwd-input"
      />
    </div>
  );
};

const FormButtons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authPurpose = useSelector((state: RootState) => state.authForm.purpose);

  const email = useSelector((state: RootState) => state.authForm.email);
  const pwd = useSelector((state: RootState) => state.authForm.password);
  const username = useSelector((state: RootState) => state.authForm.username);

  const { setFormErrorMessage } = authFormActions;
  return (
    <div className="flex justify-between gap-[40px] w-full">
      <button
        onClick={handleAuthenticate}
        className="bg-green-500 px-[10px] py-[5px] rounded hover:bg-green-600 duration-200 transition"
      >
        Save
      </button>
      {/* Cancel -> exit the form without saving anything*/}
      <button
        className="bg-gray-700 px-[10px] py-[5px] rounded hover:bg-gray-800 duration-200 transition"
        onClick={() => dispatch(resetForm())}
      >
        Cancel
      </button>
    </div>
  );
  function handleAuthenticate() {
    let errorMessage = ""; /*formSchema.validate({ title, description })
  .error?.message;*/

    dispatch(setFormErrorMessage(errorMessage));

    if (errorMessage) return;
    if (authPurpose === "log")
      dispatch(
        fetchAccountData({
          email,
          pwd
        })
      );
    if (authPurpose === "register") {
      dispatch(
        createNewAccount({
          email,
          pwd,
          username
        })
      );
    }
  }
};

export default AuthForm;
