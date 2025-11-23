import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReelForm from '../components/ReelForm';
import JobList from '../components/JobList';
import JobStatusCard from '../components/JobStatusCard';
import { createReel } from '../api';

export default function Studio() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // In-memory persistence for demo purposes
  // In a real app, this would come from local storage or backend
  useEffect(() => {
    const savedJobs = localStorage.getItem('wizzio_jobs');
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error('Failed to parse saved jobs', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wizzio_jobs', JSON.stringify(jobs));
    }
  }, [jobs, isLoaded]);

  const handleDeleteJob = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    if (selectedJobId === jobId) {
      setSelectedJobId(null);
    }
  };

  const handleCreateReel = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await createReel(formData);
      const newJob = {
        id: response.job_id,
        topic: formData.topic,
        createdAt: Date.now(),
        status: response.status || 'queued',
      };
      
      setJobs((prev) => [newJob, ...prev]);
      setSelectedJobId(newJob.id);
    } catch (error) {
      console.error('Failed to create reel:', error);
      // You might want to show a toast here
      alert('Failed to create reel: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJobStatusUpdate = (jobId, newStatus, extraData = {}) => {
    setJobs((prevJobs) => 
      prevJobs.map((job) => 
        job.id === jobId 
          ? { ...job, status: newStatus, ...extraData } 
          : job
      )
    );
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)] min-h-[600px]">
        
        {/* Left Column: Create Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 flex flex-col"
        >
          <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl h-full overflow-y-auto custom-scrollbar">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Studio</h2>
              <p className="text-slate-400 text-sm">Configure your AI video generation parameters.</p>
            </div>
            <ReelForm onSubmit={handleCreateReel} isSubmitting={isSubmitting} />
          </div>
        </motion.div>

        {/* Right Column: Status & History */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 flex flex-col gap-6 h-full"
        >
          {/* Top: Active Job Status */}
          <div className="flex-1 bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse"/>
              Current Status
            </h3>
            
            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {selectedJob ? (
                  <JobStatusCard 
                    key={selectedJob.id}
                    job={selectedJob} 
                    onStatusUpdate={handleJobStatusUpdate}
                  />
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-slate-500"
                  >
                    <p>Select a job to view progress</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom: Recent Jobs List */}
          <div className="h-1/3 bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Requests</h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <JobList 
                jobs={jobs} 
                selectedJobId={selectedJobId} 
                onSelectJob={setSelectedJobId}
                onDeleteJob={handleDeleteJob}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

