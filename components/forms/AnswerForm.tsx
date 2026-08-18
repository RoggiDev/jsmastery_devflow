"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import { AnswerSchema } from "@/lib/validations";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const AnswerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAISubmitting, setIsAISubmitting] = useState(false);

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 text-primary-500 dark:text-primary-500 gap-1.5 rounded-md border px-4 py-2.5 shadow-none"
          disabled={isAISubmitting}
        >
          {isAISubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate IA Answer
            </>
          )}
        </Button>
      </div>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-6 flex w-full flex-col gap-10"
      >
        <Controller
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="mt-3.5 flex w-full flex-col gap-3"
            >
              <Editor
                value={field.value}
                editorRef={editorRef}
                fieldChange={field.onChange}
              />

              {fieldState.error && (
                <FieldError>{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="primary-gradient text-light-900! w-fit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Answer"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AnswerForm;
