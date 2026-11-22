import { Link } from 'react-router-dom';
import LegalPage from '../components/layout/LegalPage';
import { cvData } from '../data/helpers';

const AccessibilityPage = () => {
  const { email } = cvData.personal_info;

  return (
    <LegalPage
      title="Accessibility Statement"
      description="Accessibility commitment, conformance status and feedback for Nadeem Saleem's portfolio."
      lastUpdated="22 November 2026"
    >
      <p>
        I want this portfolio to be usable by as many people as possible, including people
        who use a keyboard, a screen reader, a screen magnifier or reduced-motion settings.
      </p>

      <h2>Standards I aim for</h2>
      <p>
        This website aims to conform to <strong>WCAG 2.1 Level AA</strong> and to align
        with <strong>EN 301 549</strong>. I am also addressing relevant WCAG 2.2 AA
        criteria, including focus visibility, focus not being obscured by the sticky
        header, and minimum target sizes.
      </p>

      <h2>Conformance status</h2>
      <p>
        As of <strong>22 November 2026</strong>, this website is{' '}
        <strong>partially conformant</strong> with WCAG 2.1 AA. Most content meets the
        standard, but the limitations listed below remain. I will update this statement
        after the next accessibility audit.
      </p>

      <h2>Measures taken</h2>
      <ul>
        <li>semantic landmarks, a skip-to-content link and a logical heading structure;</li>
        <li>visible keyboard focus styles and full keyboard operation of navigation, forms and dialogs;</li>
        <li>respect for the operating system&apos;s reduced-motion preference;</li>
        <li>form labels, error messages and status updates that are announced to assistive technology;</li>
        <li>colour combinations checked against WCAG contrast requirements;</li>
        <li>text alternatives for meaningful images and hidden decorative graphics.</li>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <li>
          The downloadable CV is a PDF. A structured HTML version is available on the{' '}
          <Link to="/cv">CV page</Link>, but the PDF itself may not be fully accessible to
          every screen reader.
        </li>
        <li>
          Some project trailers are embedded from YouTube or Google Drive. Those players
          are controlled by the third party and may not fully meet the same standard.
        </li>
        <li>
          Live demos linked from case studies are hosted by third parties and are outside
          my control.
        </li>
      </ul>

      <h2>Feedback</h2>
      <p>
        If you encounter a barrier on this site, please email{' '}
        <a href={`mailto:${email}`}>{email}</a> with the page address and a short
        description of the problem. I aim to respond within five working days.
      </p>

      <h2>Preparation of this statement</h2>
      <p>
        This statement was prepared on 22 November 2026 using automated
        accessibility checks together with a keyboard review. It will be reviewed after
        the next audit.
      </p>
    </LegalPage>
  );
};

export default AccessibilityPage;
