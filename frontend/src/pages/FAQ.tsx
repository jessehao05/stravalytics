import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const FAQ = () => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setActiveIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(activeId => activeId !== id)
        : [...prevIds, id]
    );
  };

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I download my Strava archive data?",
      answer: (
        <p className="leading-6 text-sm mt-0">
          While logged in on the <a href="http://www.strava.com/" target="_blank" rel="noopener noreferrer" className="text-[#09348F] hover:text-[#5171b5] no-underline">Strava Website</a>, hover over
          your profile picture → <strong>Settings</strong> → <strong>My Account</strong>.
          At the bottom of the page, find the section "Download or Delete Your Account" → <strong>Get Started</strong> (don't worry, you won't be actually deleting your account).
          Under "Download Request (optional)," click <strong>Request Your Archive</strong>. After this, you can exit the page. You'll receive an email from which you can download your data.
          <br /><br />
          For more information, see <a href="https://support.strava.com/hc/en-us/articles/216918437-Exporting-your-Data-and-Bulk-Export#h_01GG58HC4F1BGQ9PQZZVANN6WF" target="_blank" rel="noopener noreferrer" className="text-[#09348F] hover:text-[#5171b5] no-underline">this Strava article</a> (instructions above match "Bulk Export" section).
        </p>
      )
    },
    {
      id: 2,
      question: "I don't have any Strava data to track :(",
      answer: (
        <p className="leading-6 text-sm mt-0">
          If you still want to test the website out, you use my data by clicking "Example" on the homepage.
          <br /><br />
          <img src="/static/strava-example-data.png" className="w-[400px] mb-[30px]" alt="Strava example data" />
        </p>
      )
    }
  ];

  return (
    <div>
      <div className="my-8 text-center">
        <Link to="/" className="text-[#09348F] hover:text-[#5171b5] no-underline cursor-pointer">BACK</Link>
      </div>

      

      <div className="flex flex-col items-center px-4">
        <div className="text-[1.75rem] font-bold mb-8 text-center">FAQs</div>

        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            className={`text-left max-w-[700px] w-full ${index < faqData.length - 1 ? 'border-b-2 border-[#dfdfdf]' : ''}`}
          >
            <div
              className="flex justify-between items-center text-xl font-medium my-6 cursor-pointer"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span>{faq.question}</span>

              <ChevronDown
                className={`transition-transform duration-300 ${activeIds.includes(faq.id) ? 'rotate-180' : ''}`}
              />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${activeIds.includes(faq.id) ? 'max-h-[500px]' : 'max-h-0'}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
