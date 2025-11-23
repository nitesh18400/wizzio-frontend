# Reel Generator Frontend

A React frontend application for generating reels with automatic job polling and status tracking.

## Features

- 📝 Form to submit reel generation requests
- 🔄 Automatic polling of job status every 5 seconds
- 🎨 Status badges with color coding (queued, running, finished, failed)
- 📥 Download button when reel is ready
- 🎯 Clean, modern UI with TailwindCSS

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.jsx              # Main application component
├── api.js               # Axios instance with baseURL configuration
├── main.jsx             # React entry point
├── index.css            # TailwindCSS styles
├── components/
│   ├── ReelForm.jsx     # Form component for reel generation
│   └── StatusBadge.jsx  # Status badge component
└── hooks/
    └── usePollJob.js    # Custom hook for polling job status
```

## API Endpoints

- `POST /reels` - Create a new reel generation job
- `GET /reels/{job_id}` - Get job status
- `GET /reels/{job_id}/file` - Download the generated reel

## Technologies

- React 18
- Vite
- Axios
- TailwindCSS

