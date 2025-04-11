import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            Pursuant to our{" "}
            <Link
              href="/terms-of-use"
              className="text-theme-700 hover:text-theme-900"
            >
              Terms of Use
            </Link>
            , this document describes how we treat personal information related
            to your use of this website and the services offered on and through
            it (the &quot;Service&quot;), including information you provide when
            using it.
          </p>

          <p className="mb-6">
            We expressly and strictly limit use of the Service to adults over 18
            years of age or the age of majority in the individual&apos;s
            jurisdiction, whichever is greater. Anyone under this age is
            strictly forbidden from using the Service. We do not knowingly seek
            or collect any personal information or data from persons who have
            not attained this age.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Collected</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <span className="font-semibold">Using the Service.</span> When you
              access the Service, use the search function, convert files or
              download files, your IP address, country of origin and other
              non-personal information about your computer or device (such as
              web requests, browser type, browser language, referring URL,
              operating system and date and time of requests) may be recorded
              for log file information, aggregated traffic information and in
              the event that there is any misappropriation of information and/or
              content.
            </li>
            <li>
              <span className="font-semibold">Usage Information.</span> We may
              record information about your usage of the Service such as your
              search terms, the content you access and download and other
              statistics.
            </li>
            <li>
              <span className="font-semibold">Uploaded Content.</span> Any
              content that you upload, access or transmit through the Service
              may be collected by us.
            </li>
            <li>
              <span className="font-semibold">Correspondences.</span> We may
              keep a record of any correspondence between you and us.
            </li>
            <li>
              <span className="font-semibold">Cookies.</span> When you use the
              Service, we may send cookies to your computer to uniquely identify
              your browser session. We may use both session cookies and
              persistent cookies.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Usage</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              We may use your information to provide you with certain features
              and to create a personalized experience on the Service. We may
              also use that information to operate, maintain and improve
              features and functionality of the Service.
            </li>
            <li>
              We use cookies, web beacons and other information to store
              information so that you will not have to re-enter it on future
              visits, provide personalized content and information, monitor the
              effectiveness of the Service and monitor aggregate metrics such as
              the number of visitors and page views (including for use in
              monitoring visitors from affiliates). They may also be used to
              provide targeted advertising based on your country of origin and
              other personal information.
            </li>
            <li>
              We may aggregate your personal information with personal
              information of other members and users, and disclose such
              information to advertisers and other third-parties for marketing
              and promotional purposes.
            </li>
            <li>
              We may use your information to run promotions, contests, surveys
              and other features and events.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Disclosures of Information
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              We may be required to release certain data to comply with legal
              obligations or in order to enforce our Terms of Use and other
              agreements. We may also release certain data to protect the
              rights, property or safety of us, our users and others. This
              includes providing information to other companies or organizations
              like the police or governmental authorities for the purposes of
              protection against or prosecution of any illegal activity, whether
              or not it is identified in the Terms of Use.
            </li>
            <li>
              If you upload, access or transmit any illegal or unauthorized
              material to or through the Service, or you are suspected of doing
              such, we may forward all available information to relevant
              authorities, including respective copyright owners, without any
              notice to you.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Miscellaneous</h2>
          <p className="mb-6">
            While we use commercially reasonable physical, managerial and
            technical safeguards to secure your information, the transmission of
            information via the Internet is not completely secure and we cannot
            ensure or warrant the security of any information or content you
            transmit to us. Any information or content you transmit to us is
            done at your own risk.
          </p>
        </div>
      </div>
    </div>
  );
}
