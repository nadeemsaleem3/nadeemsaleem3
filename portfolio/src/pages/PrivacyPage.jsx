import React from 'react';
import LegalPage from '../components/layout/LegalPage';
import { cvData } from '../data/helpers';

const PrivacyPage = () => {
  const { email } = cvData.personal_info;
  const addressLines = cvData.legal?.address_lines || [];

  return (
    <LegalPage
      title="Privacy Policy"
      description="How Nadeem Saleem collects, uses and protects personal data submitted through this portfolio."
      lastUpdated="21 November 2026"
    >
      <p>
        This policy explains what personal data this website collects, why it is collected,
        how long it is kept, and the rights you have under the EU General Data Protection
        Regulation (GDPR) and the UK GDPR.
      </p>

      <h2>1. Who is responsible for your data</h2>
      <p>The controller for this website is:</p>
      <address className="not-italic text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Nadeem Saleem
        <br />
        {addressLines.map((line) => (
          <React.Fragment key={line}>
            {line}
            <br />
          </React.Fragment>
        ))}
        Email: <a href={`mailto:${email}`}>{email}</a>
      </address>

      <h2>2. What data is collected</h2>
      <p>
        If you use the contact form, the following data is sent to me:
      </p>
      <ul>
        <li>your name;</li>
        <li>your email address;</li>
        <li>the subject you enter;</li>
        <li>the message you write;</li>
        <li>the time the message is submitted.</li>
      </ul>
      <p>
        The website itself does not create user accounts and does not use advertising,
        analytics or profiling cookies. The hosting provider may process standard server
        log data (such as IP address, browser type and request time) to deliver and secure
        the site.
      </p>

      <h2>3. Why I use your data and the legal basis</h2>
      <p>
        I use the contact form data only to read and respond to your enquiry. The legal
        basis is your consent under Article 6(1)(a) GDPR (and the equivalent provision of
        the UK GDPR), which you give by ticking the consent checkbox before sending the
        form.
      </p>
      <p>
        Hosting and security logs are processed on the basis of my legitimate interest in
        operating a secure and reliable website under Article 6(1)(f) GDPR.
      </p>

      <h2>4. Who receives your data</h2>
      <p>
        Messages are delivered through <strong>EmailJS</strong>, an email delivery service,
        which acts as a processor on my behalf. The website is hosted on{' '}
        <strong>GitHub Pages</strong> (GitHub, Inc.). Both providers may process data
        outside the EU/UK. Where required, transfers rely on the providers&apos; data
        processing terms and appropriate safeguards such as Standard Contractual Clauses.
      </p>
      <p>
        I do not sell your data, and I do not share it with advertisers or analytics
        providers.
      </p>

      <h2>5. Cookies and local storage</h2>
      <p>
        This site does not use cookies, analytics or advertising trackers. It stores your
        light/dark theme preference in your browser&apos;s <code>localStorage</code> under
        the key <code>portfolio-theme</code>. That value stays on your device and is not
        sent to me.
      </p>

      <h2>6. How long data is kept</h2>
      <p>
        Contact messages are kept for up to <strong>12 months</strong> so that I can follow
        up on a conversation, and are then deleted unless we agree on a longer exchange.
        You can ask me to delete your message sooner at any time.
      </p>

      <h2>7. Your rights</h2>
      <p>Subject to applicable law, you have the right to:</p>
      <ul>
        <li>access the personal data I hold about you;</li>
        <li>ask me to correct inaccurate data;</li>
        <li>ask me to delete your data;</li>
        <li>ask me to restrict how your data is used;</li>
        <li>object to processing based on legitimate interest;</li>
        <li>receive your data in a portable format;</li>
        <li>withdraw your consent at any time, without affecting the lawfulness of processing before withdrawal.</li>
      </ul>
      <p>
        To exercise any of these rights, email{' '}
        <a href={`mailto:${email}`}>{email}</a>. You also have the right to lodge a
        complaint with the data protection authority in your EU member state or, in the
        UK, with the Information Commissioner&apos;s Office (ICO).
      </p>

      <h2>8. Sensitive data</h2>
      <p>
        Please do not send sensitive personal data through the contact form (for example
        health data, identity documents or financial details). The form is intended for
        professional enquiries only.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        I may update this policy if the website or the services it uses change. The date at
        the top of this page shows when it was last revised.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this policy or your data can be sent to{' '}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </LegalPage>
  );
};

export default PrivacyPage;
