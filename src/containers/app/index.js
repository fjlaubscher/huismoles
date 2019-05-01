import React, { Fragment } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

// containers
import Home from 'containers/home';
import NotFound from 'containers/not-found';

// components
import { GlobalStyle, Container, Banner } from './style';
import { ReactComponent as BannerSVG } from 'assets/vector.svg';

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Banner>
      <BannerSVG />
    </Banner>
    <Container>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;
