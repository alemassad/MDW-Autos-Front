import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { autoIdSchema } from "./validations";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import miraAuto from "../../assets/miraAuto.webp";
import { useDispatch, useSelector } from "../../store/store";
import { getAutoById, clearEditState } from "../../slices/autoEdit";
import { useState } from "react";

type FormValues = { autoId: string };

const BuscarId = () => {
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.reducer.autoEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: joiResolver(autoIdSchema),
  });

  const onSubmit = async ({ autoId }: FormValues) => {
    setLocalError("");
    dispatch(clearEditState());
    try {
      await dispatch(getAutoById(autoId.trim())).unwrap();
      navigate(`/autos/modificar/${autoId.trim()}`);
    } catch {
      setLocalError("No se encontró un auto con esa ID.");
      reset();
    }
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${miraAuto})`,
        backgroundSize: "cover"
      }}
    >
      <h1 className={globalStyles.title}>Modificar Auto por ID</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={globalStyles.formAuto}>
        <label className={globalStyles.formLabel} htmlFor="autoId">
          ID del auto
        </label>
        <input
          id="autoId"
          type="text"
          {...register("autoId")}
          placeholder="Ingresar Id"
          className={globalStyles.formInput}
        />
        {errors.autoId && (
          <p className={globalStyles.formError}>{errors.autoId.message}</p>
        )}
        <button type="submit" className={globalStyles.formButton}>
          Buscar
        </button>
        {(localError || error) && (
          <p className={globalStyles.formError}>{localError || error}</p>
        )}
      </form>
    </div>
  );
};

export default BuscarId;
