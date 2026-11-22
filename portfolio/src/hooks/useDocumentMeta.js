import { useEffect } from 'react';

const setMeta = (attribute, key, content) => {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Update the document title and the shared social/SEO meta tags for a page.
 * The static defaults live in index.html; this hook keeps them in sync after
 * client-side navigation.
 */
export const useDocumentMeta = ({ title, description, ogTitle, ogDescription, ogType }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      setMeta('name', 'description', description);
      setMeta('name', 'twitter:description', description);
      setMeta('property', 'og:description', ogDescription || description);
    }

    const socialTitle = ogTitle || title;
    if (socialTitle) {
      setMeta('property', 'og:title', socialTitle);
      setMeta('name', 'twitter:title', socialTitle);
    }

    if (ogType) {
      setMeta('property', 'og:type', ogType);
    }
  }, [title, description, ogTitle, ogDescription, ogType]);
};
