import { ZodNullable, ZodString } from "zod";

export function capitalizeFirstLetter(string) {
	if (!string) return;
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toLowerCaseFirstLetter(string) {
	if (!string) return;
	return string.charAt(0).toLowerCase() + string.slice(1);
}

export function handleError(error) {
	if (!error) return;
	if (error?.path?.[0]) {
		return capitalizeFirstLetter(
			"Error on " + toLowerCaseFirstLetter(error?.path?.[0]) + " field: " || "",
		) +
			error.message +
			"!";
	} else {
		return error;
	}
}

export const preventNullOrUndefined = (obj) => {
	for (const key in obj) {
		if (obj[key] === null || obj[key] === undefined) {
			delete obj[key];
		}
	}
	return obj;
};

export function is_valid_uuid(s) {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(s);
}

export function alphanumeric(value: ZodString | ZodNullable<ZodString>) {
	if (value) {
		return value.refine((value) => /^[a-zA-Z0-9]+$/.test(value as string), {
			message: "The value must be alphanumeric.",
		});
	}
}
