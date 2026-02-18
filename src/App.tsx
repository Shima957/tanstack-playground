import { useForm } from "@tanstack/react-form";
import z from "zod";

const schema = z.object({
  lastName: z.string().min(1, "姓は入力必須です。"),
  firstName: z.string().min(1, "名は入力必須です。"),
  postCode: z
    .string()
    .min(1, "郵便局は入力必須です。")
    .regex(/^[0-9]*$/, "郵便番号は数字のみで入力してください。"),
  address: z.string().min(1, "住所は入力必須です。"),
  phoneNumber: z
    .string()
    .min(1, "電話番号は入力必須です。")
    .regex(/^[0-9]*$/, "電話番号は数字のみで入力してください。"),
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  lastName: "",
  firstName: "",
  postCode: "",
  address: "",
  phoneNumber: "",
};

export default function App() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="lastName"
            children={(field) => (
              <div>
                <div>
                  <label htmlFor={field.name}>姓</label>
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <div>
                  {!field.state.meta.isValid && (
                    <em role="alert">
                      {field.state.meta.errors.map((error) => error?.message)}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div>
          <form.Field
            name="firstName"
            children={(field) => (
              <div>
                <div>
                  <label htmlFor={field.name}>名</label>
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <div>
                  {!field.state.meta.isValid && (
                    <em role="alert">
                      {field.state.meta.errors.map((error) => error?.message)}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div>
          <form.Field
            name="postCode"
            children={(field) => (
              <div>
                <div>
                  <label htmlFor={field.name}>郵便番号</label>
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <div>
                  {!field.state.meta.isValid && (
                    <em role="alert">
                      {field.state.meta.errors.map((error) => error?.message)}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div>
          <form.Field
            name="address"
            children={(field) => (
              <div>
                <div>
                  <label htmlFor={field.name}>住所</label>
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <div>
                  {!field.state.meta.isValid && (
                    <em role="alert">
                      {field.state.meta.errors.map((error) => error?.message)}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div>
          <form.Field
            name="phoneNumber"
            children={(field) => (
              <div>
                <div>
                  <label htmlFor={field.name}>電話番号</label>
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <div>
                  {!field.state.meta.isValid && (
                    <em role="alert">
                      {field.state.meta.errors.map((error) => error?.message)}
                    </em>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <form.Subscribe children={() => <button type="submit">送信</button>} />
      </form>
    </div>
  );
}
