"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Path, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={form.handleSubmit(handleCreateQuestion)}
    >
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex w-full flex-col"
          >
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Question Title
              <span className="text-primary-500">*</span>
            </FieldLabel>

            <Input
              className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
              {...field}
              aria-invalid={fieldState.invalid}
            />

            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Be specific and imagine you&apos;re asking a question to another
              person.
            </FieldDescription>

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex w-full flex-col"
          >
            <FieldLabel className="paragraph-semibold text-dark400_light800">
              Detailed explanation of your problem{" "}
              <span className="text-primary-500">*</span>
            </FieldLabel>

            {/* <Editor /> */}

            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Introduce the problem and expand what you&apos;ve put in the title
            </FieldDescription>

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="tags"
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex w-full flex-col gap-3"
          >
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Tags
              <span className="text-primary-500">*</span>
            </FieldLabel>

            <div>
              <Input
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Add tags..."
              />
              Tags
            </div>

            <FieldDescription className="body-regular text-light-500 mt-2.5">
              Add up to 3 tags to describe what your question is about. You need
              to press enter to add a tag.
            </FieldDescription>

            {fieldState.error && (
              <FieldError>{fieldState.error?.message}</FieldError>
            )}
          </Field>
        )}
      />

      <div className="mt-16 flex justify-end">
        <Button
          type="submit"
          className="primary-gradient !text-light-900 w-fit"
        >
          Ask A Question
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
