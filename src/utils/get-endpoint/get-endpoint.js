export function getEndpoint(collection) {
	if (collection.startsWith('system_')) {
		return `/${collection.substring(7)}`;
	}

	return `/items/${collection}`;
}
