import React from 'react';
import LegalPage from '../components/layout/LegalPage';
import { cvData } from '../data/helpers';

const ImprintPage = () => {
  const { name, phone, email } = cvData.personal_info;
  const addressLines = cvData.legal?.address_lines || [];
  const vatId = cvData.legal?.vat_id || 'not applicable';

  return (
    <LegalPage
      title="Imprint / Legal Notice"
      description="Provider information and legal notice for Nadeem Saleem's portfolio."
      lastUpdated="21 November 2026"
    >
      <p>Information about the provider of this website:</p>

      <address className="not-italic text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        <strong>{name}</strong>
        <br />
        {addressLines.map((line) => (
          <React.Fragment key={line}>
            {line}
            <br />
          </React.Fragment>
        ))}
        Email: <a href={`mailto:${email}`}>{email}</a>
        <br />
        Phone: <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
      </address>

      <p>
        <strong>VAT ID:</strong> {vatId}
      </p>

      <p>
        <strong>Responsible for the content of this website:</strong> {name}, address as
        above.
      </p>

      <h2>Liability disclaimer</h2>
      <p>
        The content of this website is provided for general information only. Despite
        careful review, I assume no liability for its accuracy, completeness or timeliness.
        I am not responsible for the content of external websites linked from this site;
        their operators are solely responsible for their content.
      </p>
      <p>
        All original content is protected by copyright and may not be reproduced without my
        prior written consent.
      </p>

      <h2>External links</h2>
      <p>
        This website contains links to external websites, including LinkedIn, GitHub, app
        stores and live project demos. At the time of linking, no legal violations were
        apparent. If I become aware of a legal violation, I will remove the link.
      </p>
    </LegalPage>
  );
};

export default ImprintPage;
