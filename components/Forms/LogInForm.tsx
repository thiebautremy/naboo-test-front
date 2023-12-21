import AuthContext from "@components/app/context/AuthContext";
import DialogContext from "@components/app/context/DialogContext";
import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { setValueForm, setOpenConnexionDialog } = useContext(DialogContext);
  const { setToken, setUserId } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/login`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.token) {
          setValueForm(null);
          setOpenConnexionDialog(false);
          setUserId(res.userId);
          setToken(res.token);
        }
      })
      .catch((err) => console.error(err));
  };

  const registerOptions = {
    email: { required: "L'email est requis" },
    password: {
      required: "Le mot de passe est requis",
    },
  };

  const handleSignUpRedirect = () => {
    setValueForm("Inscription");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        type="email"
        {...register("email", registerOptions.email)}
        placeholder="Ecrire ici"
      />
      {errors?.email && (
        <p className="m-5 text-red-600">{errors.email.message}</p>
      )}
      <label>Password</label>
      <input
        type="password"
        {...register("password", registerOptions.password)}
        placeholder="Ecrire ici"
      />
      {errors?.password && (
        <p className="m-5 text-red-600">{errors.password.message}</p>
      )}
      <div className="flex justify-between mt-12">
        <p
          className="underline hover:cursor-pointer"
          onClick={() => handleSignUpRedirect()}
        >
          Vous n&apos;avez pas encore un compte ? <br></br>S&apos;inscrire
        </p>
        <input type="submit" value={"Se connecter"} />
      </div>
    </form>
  );
};
export default LogInForm;
