import React, { FC, useContext } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Close from "@mui/icons-material/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthContext from "@components/app/context/AuthContext";
import { fetchData } from "@components/utils/utils";
import { ActivityType } from "@components/types/Activity";

type FormValues = {
  type: string;
  city: string;
  price: number;
  createdBy: string;
  description: string;
};

type CreateActivityFormType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  setActivitiesByUserData: (value: ActivityType[] | []) => void;
};

const CreateActivityForm: FC<CreateActivityFormType> = ({
  open,
  setOpen,
  setActivitiesByUserData,
}) => {
  const { userId } = useContext(AuthContext);
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const fetchActivities = async () => {
    const response = await fetchData("activities/user/", userId);
    setActivitiesByUserData(response);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}activities`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        createdBy: userId,
        picture: `${data.type
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase()}.png`,
      }),
    })
      .then((response) => {
        if (response) {
          fetchActivities();
          setOpen(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const registerOptions = {
    type: { required: "Le type est requis" },
    city: {
      required: "La ville est requise",
    },
    description: {
      required: "La description est requise",
    },
    price: {
      required: "La prix est requis",
    },
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="px-12 pb-12">
        <DialogTitle className="flex justify-between mb-12">
          Créer une activité
          <Close
            onClick={() => setOpen(false)}
            className="hover:cursor-pointer"
          />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="type">Type de l&apos;activité</label>
          <select id="type" {...register("type", registerOptions.type)}>
            <option value="yoga">Yoga</option>
            <option value="escalade">Escalade</option>
            <option value="velo">Velo</option>
            <option value="randonnee">Randonnée</option>
            <option value="trail">Trail</option>
            <option value="surf">Surf</option>
          </select>
          {errors?.type && (
            <p className="m-5 text-red-600">{errors.type.message}</p>
          )}
          <label>Ville de l&apos;activité</label>
          <input
            type="text"
            {...register("city", registerOptions.city)}
            placeholder="Ecrire ici"
          />
          {errors?.city && (
            <p className="m-5 text-red-600">{errors.city.message}</p>
          )}
          <label>Prix de l&apos;activité</label>
          <input
            type="number"
            min={0}
            {...register("price", registerOptions.price)}
            placeholder="Ecrire ici"
          />
          {errors?.price && (
            <p className="m-5 text-red-600">{errors.price.message}</p>
          )}
          <label>Description de l&apos;activité</label>

          <input
            type="text"
            {...register("description", registerOptions.description)}
            placeholder="Ecrire ici"
          />
          {errors?.description && (
            <p className="m-5 text-red-600">{errors.description.message}</p>
          )}
          <div className="flex justify-between mt-12">
            <button onClick={() => setOpen(false)}>Annuler</button>
            <input type="submit" value={"Enregistrer"} />
          </div>
        </form>
      </div>
    </Dialog>
  );
};
export default CreateActivityForm;
