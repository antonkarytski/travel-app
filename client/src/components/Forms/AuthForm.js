import React, { useState } from "react";
import Button from "../Buttons/Button";
import Input from "./Input/Input";

const AuthForm = ({
  classes,
  message,
  loginHandler,
  signUpHandler,
  waitCondition,
  langExtraData,
}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className={classes.AuthForm}>
      <div className={classes.FormMessage}>{message}</div>
      <Input
        label={`${langExtraData.logIn}: `}
        name={"email"}
        type="text"
        onChange={changeHandler}
        className={classes.AuthInput}
        autoComplete={"off"}
      />
      <Input
        className={classes.AuthInput}
        name={"password"}
        type={"password"}
        label={`${langExtraData.password}: `}
        onChange={changeHandler}
        autoComplete={"off"}
      />
      <div className={classes.AuthButtonSet}>
        <Button
          onClick={() => loginHandler(form)}
          disabled={waitCondition}
          label={langExtraData.signInConfirm}
          className={[classes.SignInButton, classes.FormButton].join(" ")}
        />

        <Button
          onClick={() => signUpHandler(form)}
          disabled={waitCondition}
          label={langExtraData.signUpConfirm}
          className={[classes.SignUpButton, classes.FormButton].join(" ")}
        />
      </div>
    </div>
  );
};

export default AuthForm;
