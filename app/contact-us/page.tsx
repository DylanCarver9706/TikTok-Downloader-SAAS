export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="prose prose-lg max-w-none">
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 mb-6">
              We want our tools to help you the most, so we&apos;re constantly
              improving our services. If you have any comments or suggestions,
              you can tell us, we will reply to you as soon as possible.
            </p>
            <p className="text-xl text-gray-700">
              Email:{" "}
              <a
                href="mailto:carver.endeavors.llc@gmail.com"
                className="text-theme-700 hover:text-theme-900"
              >
                carver.endeavors.llc@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
