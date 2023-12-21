import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthContext from "@components/app/context/AuthContext";
import DialogContext from "@components/app/context/DialogContext";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { setValueForm, setOpenConnexionDialog } = useContext(DialogContext);
  const { setToken, setUserId } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/signup`, {
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
    firstname: { required: "Le prénom est requis" },
    lastname: { required: "Le nom est requis" },
    email: { required: "L'email est requis" },
    password: {
      required: "Le mot de passe est requis",
      minLength: {
        value: 6,
        message: "Le mot de passe doit contenir au moins 6 caractères",
      },
    },
  };

  const handleLoginRedirect = () => {
    setValueForm("Connexion");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Prénom</label>
      <input
        {...register("firstname", registerOptions.firstname)}
        placeholder="Ecrire ici"
      />
      {errors?.firstname && (
        <p className="m-5 text-red-600">{errors.firstname.message}</p>
      )}
      <label>Nom</label>
      <input
        {...register("lastname", registerOptions.lastname)}
        placeholder="Ecrire ici"
      />
      {errors?.lastname && (
        <p className="m-5 text-red-600">{errors.lastname.message}</p>
      )}
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
          onClick={() => handleLoginRedirect()}
        >
          Vous avez déjà un compte ? <br></br>Se connecter
        </p>
        <input type="submit" value={"S'inscire"} />
      </div>
    </form>
  );
};
export default SignUpForm;
