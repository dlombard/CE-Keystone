import React from 'react';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-71655733-1');

export default class GAListener extends React.Component {

  componentDidMount() {
    console.log('ME')
    console.log(this.props)
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    GoogleAnalytics.set({ page: location.pathname });
    GoogleAnalytics.pageview(location.pathname);
  }

  render() {
    return props.children;
  }
}
