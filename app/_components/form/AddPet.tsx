"use client";

import { useActionState, useRef } from "react";
import {
  DeepKeys,
  initialFormState,
  mergeForm,
  revalidateLogic,
  useForm,
  useStore,
  useTransform,
  ValidationError,
} from "@tanstack/react-form-nextjs";
import { Check, ChevronsUpDown, Minus, Plus, X } from "lucide-react";
import someAction from "@/app/_actions/action";
import { formOpts } from "@/app/_utils/form-options";
import { Checkbox } from "@base-ui/react";
import * as Select from '@/app/_components/select';
import * as Combobox from '@/app/_components/combobox';
import * as Field from '@/app/_components/field';
import * as NumberField from '@/app/_components/number-field';

interface FormValues {
  name: string;
};

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

  const form = useForm<FormValues>({
    formOpts,
    onSubmit: ({ value: formValues }) => {
      console.log('[+] onSubmit: ', formValues);
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: {
      onDynamic: ({ value: formValues }) => {
        const errors: Partial<Record<DeepKeys<FormValues>, ValidationError>> = {};

        (
          ['name'] as const
        ).forEach((requiredField) => {
          if (!formValues[requiredField]) {
            errors[requiredField] = 'This is a required field.';
          }
        });

        if (formValues.name && formValues.name.length < 2) {
          errors.name = 'At least 2 characters';
        }

        return isEmpty(errors) ? undefined : { form: errors, fields: errors};
      }
    },
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });

  return (
    <form
      aria-label="Add pet form"
      noValidate
      action={action as never}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="text-black bg-white p-4 rounded-md gap-2 flex flex-col w-100"
    >
      <form.Field
        name="name"
        children={(field) => {
          return (
            <Field.Root
              name={field.name}
              invalid={!field.state.meta.isValid}
              dirty={field.state.meta.isDirty}
              touched={field.state.meta.isTouched}
            >
              <Field.Label>{`${field.name}:`}</Field.Label>
              <Field.Control
                value={field.state.value}
                onValueChange={field.handleChange}
                onBlur={field.handleBlur}
                placeholder="Name"
              />
              <Field.Error match={!field.state.meta.isValid}>{field.state.meta.errors.join(',')}</Field.Error>
            </Field.Root>
          );
        }}
      />

      <form.Field
        name="type"
        children={(field) => {
          return (
            <Field.Root
              name={field.name}
              invalid={!field.state.meta.isValid}
              dirty={field.state.meta.isDirty}
              touched={field.state.meta.isTouched}
            >
                <Field.Label nativeLabel={false} render={<div />} className="text-nowrap">
                  {`Pet ${field.name}:`}
                </Field.Label>
                <Select.Root
                items={[ { label: 'Select a pet type', value: null }, { label: 'Dog', value: 'dog' }, { label: 'Cat', value: 'cat' }]}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <Select.Trigger className="w-86" onBlur={field.handleBlur}>
                    <Select.Value />
                    <Select.Icon>
                      <ChevronsUpDown className="size-4" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner>
                      <Select.Popup>
                        <Select.ScrollUpArrow />
                        <Select.List>
                          {[ { label: 'Select a pet type', value: null }, { label: 'Dog', value: 'dog' }, { label: 'Cat', value: 'cat' }].map(({ label, value }) => {
                            return (
                              <Select.Item key={value} value={value}>
                                <Select.ItemIndicator>
                                  <Check className="size-3" />
                                </Select.ItemIndicator>
                                <Select.ItemText>{`${label}`}</Select.ItemText>
                              </Select.Item>
                            );
                          })}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>

                <Field.Error match={!field.state.meta.isValid}>
                  {field.state.meta.errors.join(',')}
                </Field.Error>
            </Field.Root>
          );
        }}
      />

      <form.Field
        name="breed"
        mode="array"
        children={(field) => {
          return (
            <Field.Root
              name={field.name}
              invalid={!field.state.meta.isValid}
              dirty={field.state.meta.isDirty}
              touched={field.state.meta.isTouched}
            >
              <Combobox.Root
                items={breeds}
                multiple
                onValueChange={field.handleChange}
                value={field.state.value}
              >
                <Field.Label>{`${field.name}:`}</Field.Label>
                <Combobox.Chips ref={containerRef}>
                  <Combobox.Value>
                    {(value: Array<Breed>) => (
                      <>
                        {value.map((breed) => (
                          <Combobox.Chip
                            key={breed.label}
                            aria-label={breed.value}
                          >
                            {breed.label}
                            <Combobox.ChipRemove>
                              <X />
                            </Combobox.ChipRemove>
                          </Combobox.Chip>
                        ))}
                        <Combobox.Input
                          placeholder={value.length > 0 ? "" : "e.g. Labrador"}
                          onBlur={field.handleBlur}
                        />
                      </>
                    )}
                  </Combobox.Value>
                </Combobox.Chips>

                <Combobox.Portal>
                  <Combobox.Positioner sideOffset={4} anchor={containerRef}>
                    <Combobox.Popup>
                      <Combobox.Empty>{"No breeds found."}</Combobox.Empty>
                      <Combobox.List>
                        {(breed: Breed) => (
                          <Combobox.Item
                            key={breed.label}
                            value={breed}
                          >
                            <Combobox.ItemIndicator>
                              <Check className="size-3" />
                            </Combobox.ItemIndicator>
                            <div>{breed.label}</div>
                          </Combobox.Item>
                        )}
                      </Combobox.List>
                    </Combobox.Popup>
                  </Combobox.Positioner>
                </Combobox.Portal>
              </Combobox.Root>

              <Field.Error match={!field.state.meta.isValid}>
                {field.state.meta.errors.join(',')}
              </Field.Error>
            </Field.Root>
          );
        }}
      />

      <form.Field
        name="age"
        children={(field) => {
          return (
            <Field.Root
              name={field.name}
              invalid={!field.state.meta.isValid}
              dirty={field.state.meta.isDirty}
              touched={field.state.meta.isTouched}
              className="flex flex-col gap-2"
            >
              <NumberField.Root
                value={field.state.value}
                onValueChange={field.handleChange}
                min={0}
                max={25}
                className="flex gap-2 items-center justify-between"
              >
                <Field.Label>{`${field.name}:`}</Field.Label>
                <NumberField.Group className="flex">
                  <NumberField.Decrement className="flex size-10 items-center justify-center rounded-tl-md rounded-bl-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
                    <Minus className="size-4" />
                  </NumberField.Decrement>
                  <NumberField.Input
                    className="h-10 w-24 border-t border-b border-gray-200 text-center tabular-nums focus:z-1 focus:outline focus:outline-offset-1 focus:outline-blue-800"
                    onBlur={field.handleBlur}
                  />
                  <NumberField.Increment className="flex size-10 items-center justify-center rounded-tr-md rounded-br-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
                    <Plus className="size-4" />
                  </NumberField.Increment>
                </NumberField.Group>
              </NumberField.Root>

              <Field.Error match={!field.state.meta.isValid}>
                {field.state.meta.errors.join(',')}
              </Field.Error>
            </Field.Root>
          );
        }}
      />

      <form.Field name="fosterable">
        {(field) => {
          return (
            <label className="flex items-center gap-2 text-base text-gray-900">
              <Checkbox.Root
                onCheckedChange={(e) => field.handleChange(e)}
                value={field.state.value as unknown as string}
                className="flex size-5 items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-offset-2 data-checked:bg-gray-900 data-unchecked:border data-unchecked:border-gray-300"
                name={field.name}
              >
                <Checkbox.Indicator className="flex text-gray-50 data-unchecked:hidden">
                  <Check size={12} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              {"Are you this future pet's foster parent?"}
            </label>
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
};

function isEmpty(object: Partial<Record<DeepKeys<FormValues>, ValidationError>>) {
  for (const _ in object) {
    return false;
  }
  return true;
}
