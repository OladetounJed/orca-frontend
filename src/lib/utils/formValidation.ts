import { z, type UnknownKeysParam, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { Writable } from 'svelte/store';

export type LoginFormSchema = typeof loginFormSchema;
export type RegisterFormSchema = typeof registerFormSchema;
export type TokenVerificationSchema = typeof tokenVerificationSchema;

const commonValidationFields = {
	telegramId: z
		.string()
		.min(2, { message: 'telegram id must be at least 2 characters long' })
		.max(50, { message: 'telegram id must be less than 50 characters long' }),
	password: z
		.string()
		.min(6, { message: 'password must be at least 6 characters long' })
		.max(50, { message: 'password must be less than 50 characters long' })
};

export const loginFormSchema = z.object(commonValidationFields);


export const registerFormSchema = z.object({
	...commonValidationFields,
	firstName: z
		.string()
		.min(1, { message: 'first name is required' })
		.max(50, { message: 'first name must be less than 50 characters long' })
});


export const tokenVerificationSchema = z.object({
	token: z.string().min(1, { message: 'token is required' })
});

export const markAsTouched = (field: string, touched: Writable<unknown>) => {
	touched.update((current) => ({ ...(current as object), [field]: true }));
};

export const validateFormHandler = (
	validationErrors: Writable<unknown>,
	formData: unknown,
	schema: z.ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny>
) => {
	const result = schema.safeParse(formData);
	if (result.success) {
		validationErrors.set({});
		return formData;
	} else {
		const updatedErrors: { [key: string]: string[] | undefined } = {};
		for (const [key, value] of Object.entries(result.error.formErrors.fieldErrors)) {
			updatedErrors[key] = value;
		}
		validationErrors.set(updatedErrors);
	}
};
