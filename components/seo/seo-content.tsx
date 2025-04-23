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
  className?: string;
}

export function SEOContent({
  additionalFeatures = [],
  additionalSteps = [],
  additionalFaqs = [],
  className = "",
}: SEOContentProps) {
  const defaultFeatures = [
    "Download TikTok videos without watermark",
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
      description: "Paste the URL into our downloader",
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
        "Our downloader provides the highest available quality for each video, typically in HD resolution.",
    },
    {
      question: "Do I need to install any software?",
      answer:
        "No, our TikTok video downloader works directly in your web browser. No software installation is required.",
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
    <section className={`mt-12 ${className}`}>
      <div className="prose prose-lg max-w-none">
        <h2>Features of Our TikTok Downloader</h2>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <h2>How to Use Our Downloader</h2>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              <strong>{step.title}</strong>
              <p className="mt-1 text-gray-600">{step.description}</p>
            </li>
          ))}
        </ol>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
