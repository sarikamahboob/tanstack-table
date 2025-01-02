"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldApi, useForm } from '@tanstack/react-form';
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
    <>
      <p>{label}</p>
      {children}
      <span>{errors?.join(", ")}</span>
    </>
  );
};

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const zodSchema = z.object({
  name: z.string().min(1, "Name is required"),
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
    },
    onSubmit: async ({ value, formApi }) => {
      await sleep(1000);
      console.log(value)
      formApi.reset();
    },
  })
  return (
    <div className='w-[300px] p-2'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field name="name">
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
            <form.Field name="confirmPassword">
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
  )
}

export default TanstackForm