'use strict';

import axios from 'axios';

const {CancelToken} = axios;

const axiosInstance = axios.create({
	cancelToken: CancelToken.source().token,
	headers: {
		'Content-Type': 'multipart/form-data'
	}
});

export default class UploadAdapter {
	constructor(loader) {
		this.loader = loader;
	}

	upload() {
		const formData = new FormData();
		formData.append('content', this.loader.file);

		return axiosInstance.post('/api/image', formData).then(res => {
			return res.data.data;
		});
	}

	abort() {
		this.source.cancel();
	}
}