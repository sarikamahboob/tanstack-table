"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldApi, useForm, useStore } from '@tanstack/react-form';
import { validateHeaderValue } from 'http';
import { FaSpinner } from 'react-icons/fa6';
import { z } from "zod";

const Field = ({
  label,
  children,
  field,
}: {
  label: string;
  children: React.ReactNode;
  field: FieldApi<any, any, any, any>;
}) => {
  const errors = field.state.meta.errors;

  return (
    <div className='flex flex-col'>
      <p>{label}</p>
      {children}
      <span className='text-red-600'>
        {errors?.join(", ")}
        {field.state.meta.errors["onChange"]}
      </span>
    </div>
  );
};

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const zodSchema = z.object({
  name: z.string().min(3, "Name is required"),
  username: z.string(),
  email: z.string().email("Email is invalid"),
  password: z.string(),
  confirmPassword: z.string(),
});


const TanstackForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      username: "",
      email:'',
      password: "",
      confirmPassword: "",
      teamMembers: [] as { email: string;  name: string }[]
    },
    onSubmit: async ({ value, formApi }) => {
      await sleep(1000);
      console.log(value)
      formApi.reset();
    },
    validators: {
      onChange: zodSchema
      // onChange: ({ value }) => {
      //   if (!value.name) return "Name is required"; // form level error
      //   // if(!value.name) return { fields: { name: "Name is required" } }; // field level error
      // }
    }
  })
  const formErrorMap = useStore(form.store, state => state.errorMap)
  console.log({ formErrorMap });
  // const [isDirty] = useStore(form.store, state => [state.isDirty])
  return (
    <div className="w-[300px] p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="name"
            listeners={{
              onBlur: ({ value }) => {
                form.setFieldValue(
                  "username",
                  value?.toLowerCase().slice(0, 3)
                );
              },
            }}
            // validators={{
            //   onChangeAsync: ({ value }) => {
            //     if (!value) return "Name is required"
            //   },
            //   onChangeAsyncDebounceMs: 3000
            // }}
          >
            {(field) => {
              return (
                <Field label="Name" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="username">
            {(field) => {
              return (
                <Field label="Username" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="email">
            {(field) => {
              return (
                <Field label="Email" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="teamMembers" mode="array">
            {(field) => {
              return (
                <div>
                  {field?.state?.value?.map((_, index) => (
                    <div key={index} className='flex gap-2'>
                      <form.Field
                        key={`${index}name`}
                        name={`teamMembers[${index}].name`}
                      >
                        {(subField) => {
                          return (
                            <Field label="Name" field={subField}>
                              <Input
                                value={subField.state.value}
                                onChange={(e) => {
                                  subField.handleChange(e.target.value);
                                }}
                                onBlur={subField.handleBlur}
                              />
                            </Field>
                          );
                        }}
                      </form.Field>
                      <form.Field
                        key={`${index}email`}
                        name={`teamMembers[${index}].email`}
                      >
                        {(subField) => {
                          return (
                            <Field label="Email" field={subField}>
                              <Input
                                value={subField.state.value}
                                onChange={(e) => {
                                  subField.handleChange(e.target.value);
                                }}
                                onBlur={subField.handleBlur}
                              />
                            </Field>
                          );
                        }}
                      </form.Field>
                      <Button
                        onClick={() => field.removeValue(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() => field.pushValue({ email: "", name: "" })}
                  >
                    Add Team Memeber
                  </Button>
                </div>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              return (
                <Field label="Password" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return "Passwords do not match";
                }
              },
            }}
          >
            {(field) => {
              return (
                <Field label="Confirm Password" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
        </div>
        <form.Subscribe
          selector={(state) => [
            state.isValid,
            state.isDirty,
            state.isSubmitting,
          ]}
        >
          {([isValid, isDirty, isSubmitting]) => {
            return (
              <Button
                type="submit"
                disabled={!isValid || !isDirty || isSubmitting}
              >
                {isSubmitting ? <FaSpinner size="xs" /> : "Submit"}
              </Button>
            );
          }}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default TanstackForm