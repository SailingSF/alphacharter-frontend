import TagManager from 'react-gtm-module';

export const trackEvent = (category, action, label) => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'customEvent',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    },
  };
  TagManager.dataLayer(tagManagerArgs);
};
