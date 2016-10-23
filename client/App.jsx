import React from 'react';
import Immutable from 'immutable';

const SitesBodyApp = React.createClass({
  propTypes: {
    store: React.PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {
      backgroundElement: APPIAN_CONTENT_DIV
    };
  },
  renderMissingComponent(model, type, additionalProps, {eventsCreator, i18nInfo} = {}) {
    failOnMissingComponents(type, eventsCreator, i18nInfo);
  },
  render() {
  
  }
});

export default SitesBodyApp;
