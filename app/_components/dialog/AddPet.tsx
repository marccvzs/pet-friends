"use client";

import { useActionState, useRef } from "react";
import {
  initialFormState,
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form-nextjs";
import someAction from "@/app/_actions/action";
import { formOpts } from "@/app/_utils/form-options";
import { Combobox, NumberField } from "@base-ui/react";

interface Breed {
  label: string;
  value: string;
}

const breeds: Array<Breed> = [
  { label: "Labrador", value: "labrador" },
  { label: "Pit Bull", value: "pit_bull" },
  { label: "Chihuahua", value: "chihuahua" },
  { label: "Poodle", value: "poodle" },
  { label: "Mix", value: "mix" },
];

export default function AddPet() {
  const [state, action] = useActionState(someAction, initialFormState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form
      action={action as never}
      onSubmit={() => form.handleSubmit()}
      className="text-black bg-white p-4 rounded-md gap-2 flex flex-col"
    >
      {formErrors.map((error) => (
        <p key={error as unknown as string}>{error}</p>
      ))}
      <form.Field name="name">
        {(field) => {
          return (
            <div className="flex justify-between gap-2 items-center">
              <label htmlFor={field.name}>{`${field.name}:`}</label>
              <input
                name={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border border-gray-200 min-w-12 flex-1 h-8 rounded-md bg-transparent pl-2 text-base text-gray-900 outline-none"
              />
            </div>
          );
        }}
      </form.Field>

      <form.Field name="breed" mode="array">
        {(field) => {
          return (
            <Combobox.Root items={breeds} multiple name={field.name} onValueChange={(e) => field.handleChange(e)} value={field.state.value}>
              <div className="flex gap-2 justify-between items-center">
                <label htmlFor={field.name}>{`${field.name}:`}</label>
                <Combobox.Chips className="flex flex-wrap items-center gap-0.5 rounded-md border border-gray-200 px-1.5 py-1 w-64 focus-within:outline focus-within:-outline-offset-1 focus-within:outline-blue-800 min-[500px]:w-88" ref={containerRef}>
                  <Combobox.Value>
                    {(value: Array<Breed>) => (
                      <>
                        {value.map((breed) => (
                          <Combobox.Chip
                            key={breed.label}
                            className="flex items-center gap-1 rounded-md bg-gray-100 px-1.5 py-[0.2rem] text-sm text-gray-900 outline-none cursor-default [@media(hover:hover)]:[data-highlighted]:bg-blue-800 [@media(hover:hover)]:[data-highlighted]:text-gray-50 focus-within:bg-blue-800 focus-within:text-gray-50"
                            aria-label={breed.value}
                          >
                            {breed.label}
                            <Combobox.ChipRemove
                                className="rounded-md p-1 text-inherit hover:bg-gray-200"
                                aria-label="Remove"
                            >
                              {"X"}
                            </Combobox.ChipRemove>
                          </Combobox.Chip>
                        ))}
                        <Combobox.Input
                          id={field.name}
                        //   name={field.name}
                          placeholder={value.length > 0 ? "" : "e.g. Labrador"}
                          className="min-w-12 flex-1 h-8 rounded-md border-0 bg-transparent pl-2 text-base text-gray-900 outline-none"
                        />
                      </>
                    )}
                  </Combobox.Value>
                </Combobox.Chips>
              </div>

              <Combobox.Portal>
                <Combobox.Positioner sideOffset={4} anchor={containerRef}>
                  <Combobox.Popup className="w-(--anchor-width) max-h-[min(var(--available-height),23rem)] max-w-(--available-width) origin-(--transform-origin) overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity]">
                    <Combobox.Empty>{"No breeds found."}</Combobox.Empty>
                    <Combobox.List>
                      {(breed: Breed) => (
                        <Combobox.Item
                          key={breed.label}
                          value={breed}
                          className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none select-none [@media(hover:hover)]:[data-highlighted]:relative [@media(hover:hover)]:[data-highlighted]:text-gray-50 [@media(hover:hover)]:[data-highlighted]:before:absolute [@media(hover:hover)]:[data-highlighted]:before:inset-x-2 [@media(hover:hover)]:[data-highlighted]:before:inset-y-0 [@media(hover:hover)]:[data-highlighted]:before:z-[-1] [@media(hover:hover)]:[data-highlighted]:before:rounded-sm [@media(hover:hover)]:[data-highlighted]:before:bg-gray-900"
                        >
                          <Combobox.ItemIndicator>{"*"}</Combobox.ItemIndicator>
                          <div>{breed.label}</div>
                        </Combobox.Item>
                      )}
                    </Combobox.List>
                  </Combobox.Popup>
                </Combobox.Positioner>
              </Combobox.Portal>
            </Combobox.Root>
          );
        }}
      </form.Field>

      <form.Field
        name="age"
        validators={{
          onChange: ({ value }) =>
            value < 0 ? "Client validation: You must be at least 8" : undefined,
        }}
      >
        {(field) => {
          return (
            <div className="flex flex-col gap-2">
              <NumberField.Root
                id={field.name}
                defaultValue={field.state.value}
                onValueChange={(e) => field.handleChange(e!)}
                className="flex gap-2 items-center justify-between"
              >
                <NumberField.ScrubArea>
                  <label htmlFor={field.name}>{`${field.name}:`}</label>
                  <NumberField.ScrubAreaCursor>|</NumberField.ScrubAreaCursor>
                </NumberField.ScrubArea>
                <NumberField.Group className="flex">
                  <NumberField.Decrement className="flex size-10 items-center justify-center rounded-tl-md rounded-bl-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
                    {"-"}
                  </NumberField.Decrement>
                  <NumberField.Input name={field.name} className="h-10 w-24 border-t border-b border-gray-200 text-center tabular-nums focus:z-1 focus:outline focus:outline-offset-1 focus:outline-blue-800" />
                  <NumberField.Increment className="flex size-10 items-center justify-center rounded-tr-md rounded-br-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
                    {"+"}
                  </NumberField.Increment>
                </NumberField.Group>
              </NumberField.Root>
              {field.state.meta.errors.map((error) => (
                <p key={error as string} className="text-xs text-red-500">
                  {error}
                </p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="bg-purple-300 p-2 rounded-xl"
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
