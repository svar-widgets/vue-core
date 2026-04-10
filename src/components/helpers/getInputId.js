import { inject } from "vue";
import { uid } from "@svar-ui/lib-dom";

export function getInputId(id) {
	const contextId = inject("wx-input-id", null);
	return id || contextId || uid();
}
