import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First name" />

      <input {...register("lastName")} placeholder="Last name" />

      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <input type="submit" />
    </form>
  );
};

export default RegisterForm;
