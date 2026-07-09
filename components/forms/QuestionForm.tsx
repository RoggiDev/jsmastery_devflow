"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Path, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import z, { trim } from "zod";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data);
  };

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
            <FieldLabel
              htmlFor={field.name}
              className="paragraph-semibold text-dark400_light800"
            >
              Detailed explanation of your problem{" "}
              <span className="text-primary-500">*</span>
            </FieldLabel>

            <Editor
              value={field.value}
              editorRef={editorRef}
              fieldChange={field.onChange}
            />

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
                aria-invalid={fieldState.invalid}
                placeholder="Add tags..."
                onKeyDown={(e) => handleInputKeyDown(e, field)}
              />
              {field.value.length > 0 && (
                <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                  {field?.value?.map((tag: string) => (
                    <TagCard
                      key={tag}
                      _id={tag}
                      name={tag}
                      compact
                      remove
                      isButton
                      handleRemove={() => handleTagRemove(tag, field)}
                    />
                  ))}
                </div>
              )}
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
          className="primary-gradient text-light-900! w-fit"
        >
          Ask A Question
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
