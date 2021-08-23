import { i18n } from '@/lang';
// import { notify } from '@/utils/notify';
import uploadFile from '@/utils/upload-file';
// import { unexpectedError } from '../unexpected-error';

export default async function uploadFiles(files, options) {
	const progressHandler = options?.onProgressChange || (() => undefined);
	const progressForFiles = files.map(() => 0);

	try {
		const uploadedFiles = await Promise.all(
			files.map((file, index) =>
				uploadFile(file, {
					...options,
					onProgressChange: (percentage) => {
						progressForFiles[index] = percentage;
						progressHandler(progressForFiles);
					},
				})
			)
		);

		if (options?.notifications) {
			/*notify({
				title: i18n.global.t('upload_files_success', { count: files.length }),
				type: 'success',
			});*/
		}

		return uploadedFiles;
	} catch (err) {
		// unexpectedError(err);
	}
}
