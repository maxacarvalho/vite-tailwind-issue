import { shallowRef } from 'vue';

const interfacesRaw = shallowRef([]);
const interfaces = shallowRef([]);

export function getInterfaces() {
	return { interfaces, interfacesRaw };
}
