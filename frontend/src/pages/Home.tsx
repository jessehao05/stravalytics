import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import FileUpload from '../components/FileUpload'
import { useResults } from '../context/ResultsContext'
import toast from 'react-hot-toast'

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setResults } = useResults();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('action', 'upload');

      const response = await fetch('http://localhost:8000/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process file');
      }

      const data = await response.json();
      setResults(data);
      toast.success('File processed successfully!');
      navigate('/results');
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExample = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'default' }),
      });

      if (!response.ok) {
        throw new Error('Failed to load example');
      }

      const data = await response.json();
      setResults(data);
      toast.success('Example loaded!');
      navigate('/results');
    } catch (error) {
      console.error('Error loading example:', error);
      toast.error('Error loading example. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium m-0">Stravalytics</h1>

        <p className="mb-10 text-sm mt-4">
          Upload your Strava archive data (.csv) for an analysis of your activities!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <FileUpload file={file} setFile={setFile} />

          <button
            type="submit"
            disabled={isLoading}
            className="inline-block w-[150px] mt-4 mb-2 py-[0.4rem] px-[1.7rem] text-base bg-[#E0E5F8] border-none rounded-[15px] hover:bg-[#cbd4f6] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        <div className="mt-14 text-base">
          <button
            onClick={handleExample}
            disabled={isLoading}
            className="text-[#09348F] no-underline hover:text-[#5171b5] mr-4 bg-transparent border-none cursor-pointer disabled:opacity-50"
          >
            Example
          </button>
          <Link to="/faq" className="text-[#09348F] no-underline hover:text-[#5171b5]">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
