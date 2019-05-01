import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// images
import LogoSVG from 'assets/vector.svg';
import DarkLogoSVG from 'assets/vector-dark.svg';
import PinkLogoSVG from 'assets/vector-pink.svg';

const StyledCanvas = styled.canvas`
  display: none;
`;

const Preview = styled.img`
  display: block;
  width: 100%;
`;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.state = {
      previewUrl: this.props.imageUrl
    };
  }
  componentDidUpdate(prevProps) {
    const { imageUrl, logoStyle, logoPosition, logoSize } = this.props;

    if (
      prevProps.imageUrl !== imageUrl ||
      prevProps.logoStyle !== logoStyle ||
      prevProps.logoPosition !== logoPosition ||
      prevProps.logoSize !== logoSize
    ) {
      const canvas = this.canvasRef.current;
      this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      this.draw();
    }
  }
  componentDidMount() {
    this.canvasContext = this.canvasRef.current.getContext('2d');
    this.draw();
  }
  draw = () => {
    const {
      imageUrl,
      logoStyle,
      logoPosition,
      logoSize,
      onDrawComplete
    } = this.props;

    // logo colour -- need to do this with css instead sometime
    let logoUrl = '';
    switch (logoStyle) {
      case 'light':
        logoUrl = LogoSVG;
        break;
      case 'pink':
        logoUrl = PinkLogoSVG;
        break;
      case 'dark':
        logoUrl = DarkLogoSVG;
    }

    // logo size ratio
    let logoRatio = 1;
    switch (logoSize) {
      case 'large':
        logoRatio = 1;
        break;
      case 'medium':
        logoRatio = 2;
        break;
      case 'small':
        logoRatio = 3;
        break;
    }

    const logo = new Image();
    logo.onload = () => {
      // svg loaded
      const image = new Image();
      image.onload = () => {
        // image loaded -- set canvas size based on image size
        this.canvasRef.current.width = image.width;
        this.canvasRef.current.height = image.height;
        // draw image
        this.canvasContext.drawImage(image, 0, 0);
        // draw logo
        const logoAspect = logo.width / logo.height;
        const newLogoWidth = image.width / logoRatio;
        const newLogoHeight = newLogoWidth / logoAspect;
        // now position it as we know what size it's going to be
        let logoY = 0;
        switch (logoPosition) {
          case 'top':
            logoY = 0;
            break;
          case 'center':
            logoY = image.height / 2 - newLogoHeight / 2;
            break;
          case 'bottom':
            logoY = image.height - newLogoHeight;
            break;
        }

        this.canvasContext.drawImage(
          logo,
          0,
          logoY,
          newLogoWidth,
          newLogoHeight
        );

        const previewUrl = this.canvasRef.current.toDataURL();
        this.setState({ previewUrl });
        onDrawComplete(previewUrl);
      };
      image.src = imageUrl;
    };
    logo.src = logoUrl;
  };
  render() {
    return (
      <>
        <StyledCanvas ref={this.canvasRef} />
        <Preview src={this.state.previewUrl} />
      </>
    );
  }
}

Canvas.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  logoStyle: PropTypes.string.isRequired,
  logoPosition: PropTypes.string.isRequired,
  logoSize: PropTypes.string.isRequired,
  onDrawComplete: PropTypes.func.isRequired
};

export default Canvas;
