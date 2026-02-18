import { useForm } from "@tanstack/react-form";
import z from "zod";

const prefectureOptions = [
  { key: "北海道", value: "01" },
  { key: "青森県", value: "02" },
  { key: "岩手県", value: "03" },
  { key: "宮城県", value: "04" },
  { key: "秋田県", value: "05" },
  { key: "山形県", value: "06" },
  { key: "福島県", value: "07" },
  { key: "茨城県", value: "08" },
  { key: "栃木県", value: "09" },
  { key: "群馬県", value: "10" },
  { key: "埼玉県", value: "11" },
  { key: "千葉県", value: "12" },
  { key: "東京都", value: "13" },
  { key: "神奈川県", value: "14" },
  { key: "新潟県", value: "15" },
  { key: "富山県", value: "16" },
  { key: "石川県", value: "17" },
  { key: "福井県", value: "18" },
  { key: "山梨県", value: "19" },
  { key: "長野県", value: "20" },
  { key: "岐阜県", value: "21" },
  { key: "静岡県", value: "22" },
  { key: "愛知県", value: "23" },
  { key: "三重県", value: "24" },
  { key: "滋賀県", value: "25" },
  { key: "京都府", value: "26" },
  { key: "大阪府", value: "27" },
  { key: "兵庫県", value: "28" },
  { key: "奈良県", value: "29" },
  { key: "和歌山県", value: "30" },
  { key: "鳥取県", value: "31" },
  { key: "島根県", value: "32" },
  { key: "岡山県", value: "33" },
  { key: "広島県", value: "34" },
  { key: "山口県", value: "35" },
  { key: "徳島県", value: "36" },
  { key: "香川県", value: "37" },
  { key: "愛媛県", value: "38" },
  { key: "高知県", value: "39" },
  { key: "福岡県", value: "40" },
  { key: "佐賀県", value: "41" },
  { key: "長崎県", value: "42" },
  { key: "熊本県", value: "43" },
  { key: "大分県", value: "44" },
  { key: "宮崎県", value: "45" },
  { key: "鹿児島県", value: "46" },
  { key: "沖縄県", value: "47" },
] as const;

const schema = z.object({
  lastName: z.string().min(1, "姓は入力必須です。"),
  firstName: z.string().min(1, "名は入力必須です。"),
  postCode: z
    .string()
    .min(1, "郵便局は入力必須です。")
    .regex(/^[0-9]*$/, "郵便番号は数字のみで入力してください。"),
  prefecture: z
    .string()
    .min(1, "都道府県は入力必須です。")
    .refine((v) => {
      const existPrefecture = prefectureOptions
        .map((p) => p.key.toString())
        .includes(v);
      return v === "" || existPrefecture;
    }, "存在しない都道府県です。"),
  city: z.string().min(1, "市区町村は入力必須です。"),
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
  prefecture: "",
  city: "",
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
      const prefecture = prefectureOptions.find(
        (v) => v.key === value.prefecture,
      )?.value;
      console.log({ ...value, prefecture });
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
            name="prefecture"
            children={(field) => (
              <div>
                <div>
                  <label htmlFor={field.name}>都道府県</label>
                </div>
                <input
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <div>
                  {!field.state.meta.isValid && (
                    <em>
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
            name="city"
            children={(field) => (
              <div>
                <div>
                  <label htmlFor={field.name}>市区町村</label>
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
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
