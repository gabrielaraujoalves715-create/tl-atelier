import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.tlatelier.com.br';

export function CanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath =
      pathname === '/'
        ? '/'
        : pathname.replace(/\/+$/, '');

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.id = 'canonical-url';
      document.head.appendChild(canonical);
    }

    canonical.href = `${SITE_URL}${normalizedPath}`;
  }, [pathname]);

  return null;
}