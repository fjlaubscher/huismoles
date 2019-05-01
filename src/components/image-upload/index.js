import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { Container } from './style';

const ImageUpload = ({ onUpload, children, showPreview }) => {
  // callback for dropzone
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const blobUrl = URL.createObjectURL(acceptedFiles[0]);
      onUpload(blobUrl);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <Container {...getRootProps()} multiple={false}>
      <input {...getInputProps()} />
      {!showPreview && (
        <p>Drag & drop an image here, or click to select one.</p>
      )}
      {showPreview && children}
    </Container>
  );
};

ImageUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
  showPreview: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};

export default ImageUpload;
