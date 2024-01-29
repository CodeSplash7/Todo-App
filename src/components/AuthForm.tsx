// dependencies
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
import { useSelector, useDispatch } from "react-redux";
import Joi from "joi";
import { RootState, AppDispatch } from "../state/store";
import { authFormActions } from "../state/slices/authFormSlice";
import { fetchAccountData, createNewAccount } from "../state/slices/userSlice";

const AuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setFormEmail, setFormPwd, setErrorMessage, resetForm, setUsername } =
    authFormActions;
  const isAuthFormOpen = useSelector(
    (state: RootState) => state.authForm.isAuthFormOpen
  );
  const email = useSelector((state: RootState) => state.authForm.email);
  const pwd = useSelector((state: RootState) => state.authForm.password);
  const username = useSelector((state: RootState) => state.authForm.username);
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
        {authPurpose === "register" && (
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
        )}
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
        {/* Decisive buttons */}
        <div className="flex justify-between gap-[40px] w-full">
          {/* Save -> to the server */}
          <button
            onClick={() => {
              let errorMessage =
                ""; /*formSchema.validate({ title, description })
              .error?.message;*/

              dispatch(setErrorMessage(errorMessage));

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
            }}
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
        <p>{errorMessage}</p>
      </div>
    </ReactModal>
  );
};

export default AuthForm;
