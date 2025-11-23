import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Loader2, XCircle, Download, AlertCircle } from 'lucide-react';
import { getReelStatus } from '../api';
import clsx from 'clsx';

const steps = [
  { id: 'queued', label: 'Queued', icon: Clock },
  { id: 'running', label: 'Processing', icon: Loader2 },
  { id: 'finished', label: 'Ready', icon: CheckCircle2 },
];

export default function JobStatusCard({ job, onStatusUpdate }) {
  const isTerminal = job.status === 'finished' || job.status === 'failed';

  // Polling Effect
  useEffect(() => {
    if (!job || isTerminal) return;

    const pollInterval = setInterval(async () => {
      try {
        const data = await getReelStatus(job.id);
        
        // Only update if status changed or we got new data (like download_url)
        if (data.status !== job.status || data.download_url !== job.download_url) {
          onStatusUpdate(job.id, data.status, {
            download_url: data.download_url,
            error: data.error
          });
        }
      } catch (err) {
        console.error('Polling error:', err);
        // Don't mark as failed immediately on network error to allow retries,
        // but could add a retry limit in a real app.
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [job?.id, job?.status, isTerminal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Determine step progress
  let currentStepIndex = 0;
  if (job.status === 'running') currentStepIndex = 1;
  if (job.status === 'finished' || job.status === 'failed') currentStepIndex = 2;

  const isFailed = job.status === 'failed';

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto flex flex-col h-full justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{job.topic}</h2>
        <p className="font-mono text-sm text-slate-500">ID: {job.id}</p>
      </div>

      {/* Steps Progress */}
      <div className="relative flex justify-between w-full max-w-md mx-auto mb-12">
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className={clsx("h-full", isFailed ? "bg-red-500" : "bg-secondary-500")}
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const Icon = step.id === 'finished' && isFailed ? XCircle : step.icon;
          const isSpinning = step.id === 'running' && job.status === 'running';
          
          return (
            <div key={step.id} className="relative flex flex-col items-center z-10">
              <motion.div
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isActive 
                    ? (isFailed && step.id === 'finished' ? '#ef4444' : '#8b5cf6') 
                    : '#0f172a', // slate-900
                  borderColor: isActive 
                    ? (isFailed && step.id === 'finished' ? '#ef4444' : '#8b5cf6')
                    : '#334155', // slate-700
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 shadow-xl"
              >
                <Icon className={clsx(
                  "w-5 h-5",
                  isActive ? "text-white" : "text-slate-500",
                  isSpinning && "animate-spin"
                )} />
              </motion.div>
              <span className={clsx(
                "mt-3 text-xs font-medium transition-colors",
                isActive ? "text-slate-200" : "text-slate-600"
              )}>
                {step.id === 'finished' && isFailed ? 'Failed' : step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Actions Area */}
      <div className="flex justify-center">
        {job.status === 'finished' && job.download_url && (
          <motion.a
            href={`https://untidal-glossier-khalil.ngrok-free.dev${job.download_url}`}
            target="_blank"
            rel="noopener noreferrer"
            download
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-green-500/20 transition-all hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Reel
          </motion.a>
        )}

        {job.status === 'failed' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl max-w-md"
          >
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="text-sm">{job.error || "An unknown error occurred during generation."}</p>
          </motion.div>
        )}

        {['queued', 'running'].includes(job.status) && (
          <p className="text-slate-400 animate-pulse">
            Working on your reel...
          </p>
        )}
      </div>
    </motion.div>
  );
}

