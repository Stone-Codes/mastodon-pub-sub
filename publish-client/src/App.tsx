import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./App.module.css";

type FormValues = {
  status: string;
  media: FileList;
};

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  // Shortcut: No proper notification / error handling here, just some alerts
  const postStatus = (body: FormData) => {
    fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body,
    }).then(async (res) => {
      if (res.status !== 200) {
        const err = await res.json();
        alert(`Something went wrong: ${err.error}`);
      } else {
        alert("Status was posted");
        reset();
      }
    });
  };

  // Shortcut: Didnt add proper file validation on the client to reduce load on the backend
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    formData.append("status", data.status);
    if (data.media[0]) formData.append("media", data.media[0]);

    postStatus(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formRow}>
          <label htmlFor="status">Status message:</label>
          <br />
          <input {...register("status", { required: true })} />
          <span className={styles.formError}>
            {errors.status && "Status message is required"}
          </span>
        </div>
        <div className={styles.formRow}>
          {/* Just allowing simple image types here */}
          <input
            {...register("media")}
            type="file"
            accept="image/jpeg, image/png"
          />
        </div>
        <div>
          <button type="submit">Post status</button>
        </div>
      </form>
    </div>
  );
}

export default App;
