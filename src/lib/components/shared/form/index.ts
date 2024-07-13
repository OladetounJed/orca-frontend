import * as FormPrimitive from 'formsnap';
import FieldErrors from './form-field-errors.svelte';
import Field from './form-field.svelte';
import Button from './form-button.svelte';

const Control = FormPrimitive.Control;

export {
	Field,
	Control,
	Button,
	FieldErrors,
	//
	Field as FormField,
	Control as FormControl,
	FieldErrors as FormFieldErrors,
	Button as FormButton
};
