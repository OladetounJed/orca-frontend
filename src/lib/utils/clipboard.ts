import { toast } from '$lib/components/shared/toast';

export const copyToClipboard = async (text: string | null): Promise<void> => {
	if (!text) return;
	try {
		await navigator.clipboard.writeText(text);
		toast.success('text copied to clipboard');
	} catch {
		toast.error('failed to copy text to clipboard');
	}
};

export const pasteFromClipboard = async (): Promise<string> => {
	try {
		const text = await navigator.clipboard.readText();
		return text;
	} catch {
		toast.error('failed to paste text to clipboard');
		return '';
	}
};
