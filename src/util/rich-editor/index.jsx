import React from 'react'
import Simditor from 'simditor'

import Util from 'util/util.jsx'
const _util = new Util()

import 'simditor/styles/simditor.scss'


class RichEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadEditor()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail) {
      this.editor.setValue(nextProps.defaultDetail)
    }
  }

  loadEditor() {
    this.textarea = this.refs['textarea']
    this.editor = new Simditor({
      textarea: $(this.textarea),
      defaultValue: this.props.placeholder,
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    })

    this.bindEditorEvent()
  }
  bindEditorEvent() {
    this.editor.on('valuechanged', e => {
      this.props.onValueChange(this.editor.getValue())
    })
  }

  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"></textarea>
      </div>
    )
  }
}

export default RichEditor