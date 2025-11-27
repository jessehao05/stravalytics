import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const FAQ = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I download my Strava archive data?",
      answer: (
        <p>
          While logged in on the <a href="http://www.strava.com/" target="_blank" rel="noopener noreferrer">Strava Website</a>, hover over
          your profile picture → <strong>Settings</strong> → <strong>My Account</strong>.
          At the bottom of the page, find the section "Download or Delete Your Account" → <strong>Get Started</strong> (don't worry, you won't be actually deleting your account).
          Under "Download Request (optional)," click <strong>Request Your Archive</strong>. After this, you can exit the page. You'll receive an email from which you can download your data.
          <br /><br />
          For more information, see <a href="https://support.strava.com/hc/en-us/articles/216918437-Exporting-your-Data-and-Bulk-Export#h_01GG58HC4F1BGQ9PQZZVANN6WF" target="_blank" rel="noopener noreferrer">this Strava article</a> (instructions above match "Bulk Export" section).
        </p>
      )
    },
    {
      id: 2,
      question: "I don't have any Strava data to track :(",
      answer: (
        <p>
          If you still want to test the website out, you use my data by clicking "Example" on the homepage.
          <br /><br />
          <img src="/static/strava-example-data.png" style={{ width: '400px', marginBottom: '30px' }} alt="Strava example data" />
        </p>
      )
    }
  ];

  return (
    <div>
      <div className="back-button">
        <Link to="/">BACK</Link>
      </div>

      <div className="faq-section">
        <div className="faq-title">FAQs</div>

        {faqData.map((faq) => (
          <div
            key={faq.id}
            className={`faq ${activeId === faq.id ? 'active' : ''}`}
            onClick={() => toggleFAQ(faq.id)}
          >
            <div className="question">
              <span>{faq.question}</span>

              <svg width="15" height="10" viewBox="0 0 42 25">
                <path d="M3 3L21 21L39 3" stroke="black" strokeWidth="7" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="answer">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
