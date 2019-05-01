import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

// components
import ImageUpload from 'components/image-upload';
import Canvas from 'components/canvas';
import { Container, Form, DownloadLink, StyledDropdown } from './style';

const logoOptions = [
  { value: 'light', label: 'White' },
  { value: 'pink', label: 'Pink' },
  { value: 'dark', label: 'Black' }
];

const positionOptions = [
  { value: 'top', label: 'Top' },
  { value: 'center', label: 'Center' },
  { value: 'bottom', label: 'Bottom' }
];

const sizeOptions = [
  { value: 'large', label: 'Large' },
  { value: 'medium', label: 'Medium' },
  { value: 'small', label: 'Small' }
];

const Home = () => {
  const [logoStyle, setLogoStyle] = useState('light');
  const [logoPosition, setLogoPosition] = useState('top');
  const [logoSize, setLogoSize] = useState('large');
  const [originalImage, setOriginalImage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);

  return (
    <Container>
      <Helmet title='Huismoles' />
      <ImageUpload
        onUpload={imageUrl => setOriginalImage(imageUrl)}
        showPreview={originalImage !== ''}
      >
        <Canvas
          imageUrl={originalImage}
          logoPosition={logoPosition}
          logoStyle={logoStyle}
          logoSize={logoSize}
          onDrawComplete={data => {
            const replaced = data.replace(
              /^data:image\/[^;]+/,
              'data:application/octet-stream'
            );
            setDownloadUrl(replaced);
          }}
        />
      </ImageUpload>
      {originalImage && (
        <Form>
          <StyledDropdown
            label='Logo style'
            options={logoOptions}
            onChange={selected => setLogoStyle(selected.value)}
          />
          <StyledDropdown
            label='Logo size'
            options={sizeOptions}
            onChange={selected => setLogoSize(selected.value)}
          />
          <StyledDropdown
            label='Logo position'
            options={positionOptions}
            onChange={selected => setLogoPosition(selected.value)}
          />
          <DownloadLink href={downloadUrl} download='huismoles.jpg'>
            Download
          </DownloadLink>
        </Form>
      )}
    </Container>
  );
};

export default Home;
