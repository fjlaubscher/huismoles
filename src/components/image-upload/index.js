import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { Container, Preview } from './style';

const ImageUpload = ({ onFileDrop, previewUrl }) => {
  // callback for dropzone
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const uploadedUrl = URL.createObjectURL(acceptedFiles[0]);
      onFileDrop(uploadedUrl);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <Container {...getRootProps()} multiple={false}>
      <input {...getInputProps()} />
      {!previewUrl && <p>Drag & drop an image here, or click to select one.</p>}
      {previewUrl && <Preview src={previewUrl} />}
    </Container>
  );
};

ImageUpload.propTypes = {
  onFileDrop: PropTypes.func.isRequired,
  previewUrl: PropTypes.string
};

export default ImageUpload;
