import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Type, Globe2, Mic2, Search, Hash, Video, Loader2 } from 'lucide-react';

const LANGUAGES = ['Hindi', 'English', 'Spanish', 'French', 'German', 'Italian'];
const VOICES = ['Brian', 'Amy', 'Emma', 'Joanna', 'Ivy', 'Joey', 'Justin', 'Kendra', 'Kimberly', 'Matthew'];

const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="group">
    <label className="block text-xs font-medium text-slate-400 mb-1.5 group-hover:text-secondary-400 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-500 group-focus-within:text-secondary-400 transition-colors" />
      </div>
      <input
        {...props}
        className="w-full pl-9 pr-3 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
      />
    </div>
  </div>
);

const SelectField = ({ icon: Icon, label, options, ...props }) => (
  <div className="group">
    <label className="block text-xs font-medium text-slate-400 mb-1.5 group-hover:text-secondary-400 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-500 group-focus-within:text-secondary-400 transition-colors" />
      </div>
      <select
        {...props}
        className="w-full pl-9 pr-3 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-secondary-500 focus:border-secondary-500 transition-all appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const Toggle = ({ icon: Icon, label, checked, onChange, name }) => (
  <label className="relative flex items-center p-3 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800/30 hover:border-slate-600 transition-all group">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div className={`p-1.5 rounded-lg mr-3 transition-colors ${checked ? 'bg-secondary-500/20 text-secondary-400' : 'bg-slate-800 text-slate-500'}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-grow">
      <span className={`block text-sm font-medium transition-colors ${checked ? 'text-slate-200' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
    <div className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors ${checked ? 'bg-secondary-500' : 'bg-slate-700'}`}>
      <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
  </label>
);

export default function ReelForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    topic: '',
    language: 'English',
    voice: 'Brian',
    download_videos: true,
    video_query: '',
    add_cta: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        icon={Type}
        label="Topic or Idea"
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        placeholder="e.g., Top 5 productivity hacks for remote workers"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          icon={Globe2}
          label="Language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          options={LANGUAGES}
          required
        />
        <SelectField
          icon={Mic2}
          label="Voice AI"
          name="voice"
          value={formData.voice}
          onChange={handleChange}
          options={VOICES}
          required
        />
      </div>

      <InputField
        icon={Search}
        label="Visual Style / Video Query"
        name="video_query"
        value={formData.video_query}
        onChange={handleChange}
        placeholder="e.g., minimalist office, sunset, technology"
      />

      <div className="grid grid-cols-1 gap-3 pt-2">
        <Toggle
          icon={Video}
          label="Download Source Videos"
          name="download_videos"
          checked={formData.download_videos}
          onChange={handleChange}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 relative group overflow-hidden rounded-xl bg-gradient-to-r from-secondary-600 to-primary-600 p-px focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="relative flex items-center justify-center gap-2 bg-slate-900 group-hover:bg-transparent transition-colors rounded-xl py-3.5 px-6">
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Wand2 className="w-5 h-5 text-white" />
          )}
          <span className="font-bold text-white">
            {isSubmitting ? 'Generating...' : 'Generate Reel'}
          </span>
        </div>
      </motion.button>
    </form>
  );
}
