'use server';

import {
    ServerValidateError,
    createServerValidate,
} from '@tanstack/react-form-nextjs';
import { formOpts } from '../_utils/form-options';

const serverValidate = createServerValidate({
    ...formOpts,
    onServerValidate: ({ value }) => {
        console.log('[+] value: ', value);
        if (value.age < 0) {
            return 'Server validation: Pet must be at least 0 to sign up'
        }
    },
});

export default async function someAction(prev: unknown, formData: FormData) {
    try {
        console.log('[+] formData: ', formData);
        const validatedData = await serverValidate(formData);
        console.log('[+] validatedData: ', validatedData);
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        throw e
    }
}