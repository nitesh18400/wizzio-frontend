import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, Loader2, FileVideo } from 'lucide-react';
import clsx from 'clsx';

const statusConfig = {
  queued: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  running: { icon: Loader2, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', animate: true },
  finished: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
};

export default function JobList({ jobs, selectedJobId, onSelectJob }) {
  if (jobs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center">
        <FileVideo className="w-12 h-12 mb-4 opacity-20" />
        <p>No requests yet.</p>
        <p className="text-xs mt-1">Create your first reel to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {jobs.map((job) => {
        const config = statusConfig[job.status] || statusConfig.queued;
        const Icon = config.icon;
        const isSelected = selectedJobId === job.id;

        return (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelectJob(job.id)}
            className={clsx(
              "group p-4 rounded-xl border cursor-pointer transition-all duration-200",
              isSelected 
                ? "bg-secondary-500/10 border-secondary-500/50 shadow-lg shadow-secondary-500/10" 
                : "bg-slate-900/30 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <h4 className={clsx(
                  "font-medium truncate transition-colors",
                  isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                )}>
                  {job.topic}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-mono text-slate-500">
                    #{job.id.slice(0, 8)}
                  </span>
                  <span className="text-xs text-slate-600">
                    {new Date(job.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className={clsx(
                "px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5",
                config.bg,
                config.color
              )}>
                <Icon className={clsx("w-3.5 h-3.5", config.animate && "animate-spin")} />
                <span className="capitalize">{job.status}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

