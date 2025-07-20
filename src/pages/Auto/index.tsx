import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import globalStyles from "../Pages.module.css";
import { useSelector, useDispatch } from "../../store/store";
import { getAutoById, clearAuto } from "../../slices/auto";
import buscaaut from "../../assets/buscaaut.jpg";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { autoIdSchema } from "./validations";

type FormValues = { autoId: string };

const Auto = () => {
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const { auto, loading, error } = useSelector((state) => state.reducer.auto);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: joiResolver(autoIdSchema),
    defaultValues: { autoId: paramId || "" },
  });

  useEffect(() => {
    if (paramId) {
      setValue("autoId", paramId);
      dispatch(getAutoById(paramId));
    }
    return () => {
      dispatch(clearAuto());
    };
  }, [paramId, dispatch, setValue]);

  useEffect(() => {
    dispatch(clearAuto());
  }, [dispatch]);

  const onSubmit = (data: FormValues) => {
    if (data.autoId.trim()) {
      navigate(`/autos/${data.autoId.trim()}`);
    }
  };

  return (
    <div
      className={globalStyles.container}
      style={{
        backgroundImage: `url(${buscaaut})`,
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
      <h1 className={globalStyles.title}>Buscar Vehículo por ID</h1>
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
      {loading ? (
        <div className={globalStyles.spinner}></div>
      ) : error ? (
        <p className={globalStyles.formError} style={{ textAlign: "center" }}>
          {error}
        </p>
      ) : auto ? (
        auto.isActive ? (
          <div className={globalStyles.formAuto} style={{ marginTop: "2rem" }}>
            <h2 style={{ textAlign: "center" }}>{auto.name}</h2>
            <p>
              <b>ID:</b> {auto._id}
            </p>
            <p>
              <b>Descripción:</b> {auto.description}
            </p>
            <p>
              <b>Stock:</b> {auto.amount}
            </p>
            <p>
              <b>Precio:</b> u$s {auto.price}
            </p>
            {auto.ownerId && (
              <p>
                <b>Propietario:</b> {auto.ownerId}
              </p>
            )}
            {auto.image && (
              <img
                src={auto.image}
                alt={auto.name}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  marginTop: 8,
                }}
              />
            )}
          </div>
        ) : (
          <p className={globalStyles.formError} style={{ textAlign: "center" }}>
            El auto no está activo.
          </p>
        )
      ) : null}
    </div>
  );
};

export default Auto;
