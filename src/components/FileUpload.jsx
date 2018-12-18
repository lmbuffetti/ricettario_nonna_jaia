import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.btnRef = React.createRef();
        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(e) {
        const { handleFileChange } = this.props;
        const reader = new FileReader();
        const file = e.target.files[0];
        let inputData = '';
        if (!file) return;

        reader.onload = (event) => {
            inputData = event.target.result;
            handleFileChange(inputData);
        };
        reader.readAsDataURL(file);
    }

    render() {
        const { name } = this.props;
        return (
            <input name={name} ref={this.btnRef} type="file" accept="image/*" onChange={this.handleFile} />
        );
    }
}

FileUpload.propTypes = {
    name: PropTypes.string.isRequired,
    handleFileChange: PropTypes.func.isRequired,
};

FileUpload.defaultProps = {

};

export default FileUpload;
