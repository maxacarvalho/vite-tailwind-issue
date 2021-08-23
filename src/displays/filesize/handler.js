import bytes from 'bytes';

export default function handler(value) {
	return bytes(value, { decimalPlaces: 0 });
}
