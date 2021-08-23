import axios from 'axios';
import emitter from '@/events';
import { i18n } from '@/lang';
// import { notify } from '@/utils/notify';
// import { unexpectedError } from '../unexpected-error';

export default async function uploadFile(file, options) {
	const progressHandler = options?.onProgressChange || (() => undefined);
	const formData = new FormData();

	if (options?.preset) {
		for (const [key, value] of Object.entries(options.preset)) {
			formData.append(key, value);
		}
	}

	formData.append('file', file);

	try {
		let response = null;

		if (options?.fileId) {
			response = await axios.patch(`/files/${options.fileId}`, formData, {
				onUploadProgress,
			});
		} else {
			response = await axios.post(`/files`, formData, {
				onUploadProgress,
			});
		}

		if (options?.notifications) {
			/*notify({
				title: i18n.global.t('upload_file_success'),
				type: 'success',
			});*/
		}

		emitter.emit(Events.upload);

		return response.data.data;
	} catch (err) {
		// unexpectedError(err);
	}

	function onUploadProgress(progressEvent) {
		const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
		progressHandler(percentCompleted);
	}
}
