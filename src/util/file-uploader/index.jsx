import React from 'react'
import FileUpload from './react-fileupload.jsx'

import Util from 'util/util.jsx'
const _util = new Util()

class FileUploader extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const options = {
      baseUrl: '/manage/product/upload.do',
      fileFieldName: 'upload_file',
      accept: 'image/gif,image/jpeg,image/jpg,image/png',
      chooseAndUpload: true,
      uploadSuccess: (res) => { this.props.onSuccess(res.data) },
      uploadError: (err) => { this.props.onError(err.message) }
    }

    return (
      <FileUpload options={options}>
        <button ref="chooseAndUpload">上传图片</button>
      </FileUpload>
    )
  }
}

export default FileUploader