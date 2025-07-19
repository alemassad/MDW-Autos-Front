import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { autoIdSchema } from "./validations";
import { useNavigate } from "react-router-dom";
import globalStyles from "../Pages.module.css";
import miraAuto from "../../assets/miraAuto.webp";

import axios from "../../config/axios";

const BuscarId = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ autoId: string }>({
    resolver: joiResolver(autoIdSchema),
  });

  const onSubmit = async ({ autoId }: { autoId: string }) => {
    try {
      const res = await axios.get(`/cars/${autoId.trim()}`);
      if (res.data && res.data.data) {
        navigate(`/autos/modificar/${autoId.trim()}`);
      } else {
        reset();
      }
    } catch {
      reset();
    }
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${miraAuto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
      </form>
    </div>
  );
};

export default BuscarId;
