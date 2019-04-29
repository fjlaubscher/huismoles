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
  { value: 'light', label: 'Black' },
  { value: 'dark', label: 'White' }
];

const positionOptions = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' }
];

const Home = () => {
  const [alternateLogo, setAlternateLogo] = useState(false);
  const [logoAtTop, setLogoAtTop] = useState(true);
  const [originalImage, setOriginalImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  useEffect(() => {
    if (originalImage) {
      const logoUrl = (alternateLogo && whiteLogo) || blackLogo;

      const tempImage = new Image();
      tempImage.onload = () => {
        const imageSize = {
          width: tempImage.width,
          height: tempImage.height
        };

        mergeImages([
          { src: originalImage },
          {
            src: logoUrl,
            x: 0,
            y: logoAtTop ? 0 : imageSize.height - 178
          }
        ]).then(baseImage => {
          const downloadableImg = baseImage.replace(
            /^data:image\/[^;]+/,
            'data:application/octet-stream'
          );
          setDownloadLink(downloadableImg);
          setUploadedImage(baseImage);
        });
      };
      tempImage.src = originalImage;
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
            onChange={selected => setAlternateLogo(selected.value === 'dark')}
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
