'use client';

import {useActionState } from 'react';
import {
    initialFormState,
    mergeForm,
    revalidateLogic,
    useForm,
    useStore,
    useTransform,
} from '@tanstack/react-form-nextjs';
import someAction from '@/app/_actions/action';
import { inquiryFormOpts } from '@/app/_utils/form-options';
import { Field } from '@base-ui/react';

export const InquiryForm = () => {
    const [state, action] = useActionState(someAction, initialFormState);

    const form = useForm({
        ...inquiryFormOpts,
        validationLogic: revalidateLogic({
            mode: 'submit',
            modeAfterSubmission: 'change',
        }),
        validators: {
            onDynamic: ({ value: formValues }) => {
                const errors = {};

                if (!formValues.firstName) {
                    errors.firstName = 'First Name is required.';
                }

                return { form: errors, fields: errors };
            },
        },
        onSubmit: async ({ value: formValues }) => {
            console.log('[+] formValues: ', formValues);
        }
        // transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    });

    const formErrors = useStore(form.store, (formState) => formState.errors);

    return (
        <form aria-label="Pet Inquiry" action={action as never} noValidate onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }} className="flex flex-col gap-4">

            <form.Field
                name="firstName"
                children={(field) => {
                    return (
                        <Field.Root
                            name={field.name}
                            invalid={!field.state.meta.isValid}
                            dirty={field.state.meta.isDirty}
                            touched={field.state.meta.isTouched}
                            className="flex gap-2"    
                        >
                            <Field.Label>{`${field.name}: `}</Field.Label>
                            <Field.Control
                                value={field.state.value}
                                onValueChange={field.handleChange}
                                onBlur={field.handleBlur}
                                className="input"
                            />
                            <Field.Error match={!field.state.meta.isValid}>
                                {field.state.meta.errors.join(',')}
                            </Field.Error>
                        </Field.Root>
                    )
                }}
            />

            <form.Field name="lastName">
                {(field) => {
                    return (
                        <div className="flex gap-2">
                            <label htmlFor={field.name}>{`${field.name}:`}</label>
                            <input name={field.name} type="text" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="input" />
                        </div>
                    )
                }}
            </form.Field>

            <form.Field name="email">
                {(field) => {
                    return (
                        <div className="flex gap-2">
                            <label htmlFor={field.name}>{`${field.name}:`}</label>
                            <input type="email" className="input" name={field.name} id={field.name} onChange={(e) => field.handleChange(e.target.value)} />
                        </div>
                    )
                }}
            </form.Field>

            <form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit} className="bg-gray-400 rounded-md border hover:bg-gray-900">
                        {isSubmitting ? '...' : 'Submit'}
                    </button>
                )}
            </form.Subscribe>
        </form>
    )
}