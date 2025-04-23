interface SEOContentProps {
  additionalFeatures?: string[];
  additionalSteps?: {
    title: string;
    description: string;
  }[];
  additionalFaqs?: {
    question: string;
    answer: string;
  }[];
  includeFeatures?: boolean;
}

export function SEOContent({
  additionalFeatures = [],
  additionalSteps = [],
  additionalFaqs = [],
  includeFeatures = false,
}: SEOContentProps) {
  const defaultFeatures = [
    "No watermark",
    "HD quality video downloads",
    "Fast download speeds",
    "No registration required",
    "Works on all devices",
    "Free to use",
  ];

  const defaultSteps = [
    {
      title: "Find the TikTok video",
      description: "Find the TikTok video you want to download",
    },
    {
      title: "Copy the URL",
      description: "Click the share button and copy the video URL",
    },
    {
      title: "Paste the URL",
      description: "Paste the URL into the downloader",
    },
    {
      title: "Download",
      description: "Click the download button and save your video",
    },
  ];

  const defaultFaqs = [
    {
      question: "Is it legal to download TikTok videos?",
      answer:
        "Yes, it is legal to download TikTok videos for personal use. However, you should respect copyright laws and not use downloaded content for commercial purposes without permission.",
    },
    {
      question: "What video quality can I download?",
      answer:
        "The downloader provides the highest available quality for each video, typically in HD resolution.",
    },
    {
      question: "Do I need to install any software?",
      answer:
        "No, the TikTok video downloader works directly in your web browser. No software installation is required.",
    },
    {
      question: "How long does it take to download a video?",
      answer:
        "Most individual videos download in seconds per video, depending on your internet connection and the video size.",
    },
  ];

  const features = [...defaultFeatures, ...additionalFeatures];
  const steps = [...defaultSteps, ...additionalSteps];
  const faqs = [...defaultFaqs, ...additionalFaqs];

  return (
    <section className="mt-16">
      <div className="w-full max-w-[800px] mx-auto px-4 space-y-12">
        {/* Features Section */}
        {includeFeatures && (
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-theme-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Features of TTokDownloader
            </h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-theme-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Steps Section */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-theme-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How to Use The Downloader
          </h2>
          <div className="flex justify-center">
            <div className="space-y-6 w-full">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-100 flex items-center justify-center">
                    <span className="text-theme-600 font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-theme-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="flex justify-center">
            <div className="space-y-6 w-full">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-theme-100 flex items-center justify-center">
                        <span className="text-theme-600 font-bold">Q</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex items-start space-x-3 mt-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-theme-50 flex items-center justify-center">
                        <span className="text-theme-600 font-bold">A</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
