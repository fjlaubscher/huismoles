import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import mergeImages from 'merge-images';

// components
import ImageUpload from 'components/image-upload';
import { Container, Form, DownloadLink, StyledDropdown } from './style';

// images
import blackLogo from 'assets/logo-black.png';
import whiteLogo from 'assets/logo-white.png';

const logoOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
];

const positionOptions = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' }
];

const Home = () => {
  const [darkLogo, setDarkLogo] = useState(true);
  const [logoAtTop, setLogoAtTop] = useState(true);
  const [originalImage, setOriginalImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  useEffect(() => {
    if (originalImage) {
      const logoUrl = (darkLogo && whiteLogo) || blackLogo;
      const mergeOptions = {
        width: 500,
        height: 500
      };

      mergeImages(
        [
          { src: originalImage },
          {
            src: logoUrl,
            x: 0,
            y: logoAtTop ? 0 : 322
          }
        ],
        mergeOptions
      ).then(baseImage => {
        const downloadableImg = baseImage.replace(
          /^data:image\/[^;]+/,
          'data:application/octet-stream'
        );
        setDownloadLink(downloadableImg);
        setUploadedImage(baseImage);
      });
    }
  });

  return (
    <Container>
      <Helmet title='Huismoles' />
      <ImageUpload
        onFileDrop={blobUrl => setOriginalImage(blobUrl)}
        previewUrl={uploadedImage}
      />
      {uploadedImage && (
        <Form>
          <StyledDropdown
            label='Logo style'
            options={logoOptions}
            onChange={selected => setDarkLogo(selected.value === 'dark')}
          />
          <StyledDropdown
            label='Logo position'
            options={positionOptions}
            onChange={selected => setLogoAtTop(selected.value === 'top')}
          />
          <DownloadLink href={downloadLink} target='_blank'>
            Download
          </DownloadLink>
        </Form>
      )}
    </Container>
  );
};

export default Home;
