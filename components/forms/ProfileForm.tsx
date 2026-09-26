"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";

import { Textarea } from "../ui/textarea";

interface Params {
  user: User;
}

const ProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast.success("Success", {
          description: "Your profile has been updated successfully.",
        });

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error(`Error (${result.status})`, {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateProfile)}
      className="mt-9 flex w-full flex-col gap-9"
    >
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Name
              <span className="text-primary-500">*</span>
            </FieldLabel>

            <Input
              className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              placeholder="Your Name"
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Username
              <span className="text-primary-500">*</span>
            </FieldLabel>

            <Input
              className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              placeholder="Your username"
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="portfolio"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Portfolio Link
            </FieldLabel>

            <Input
              type="url"
              className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              placeholder="Your Portfolio link"
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="location"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Location
              <span className="text-primary-500">*</span>
            </FieldLabel>

            <Input
              className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              placeholder="Where do you live?"
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="bio"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Bio
              <span className="text-primary-500">*</span>
            </FieldLabel>

            <Textarea
              rows={5}
              className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-14 border"
              placeholder="What's special about you?"
              {...field}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <div className="mt-7 flex justify-end">
        <Button
          type="submit"
          className="primary-gradient text-light-900! w-fit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
