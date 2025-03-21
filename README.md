# Tab Showcase

A Next.js application showcasing different interface designs including:

- Spotify UI
- TikTok UI
- Spreadsheet UI
- 3D UI
- Terminal UI

## Features

- Multiple interface designs showcasing different UI patterns
- Step-by-step building of each interface
- Keyboard controls for navigation
- Responsive design

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React Icons
- React Three Fiber

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Navigation

- **Tab**: Next step
- **Esc**: Previous step
- **←**: Previous view
- **→**: Next view
- **Space**: Play/Pause (Spotify view)

## Deployment with Vercel

This project is set up with GitHub Actions to automatically deploy to Vercel when changes are pushed to the main branch.

### Setup Instructions

1. Create a Vercel account and create a new project
2. Link your GitHub repository to the Vercel project
3. Get the required secrets:
   - `VERCEL_TOKEN`: Create a token in Vercel account settings
   - `VERCEL_ORG_ID`: Find in your Vercel project settings
   - `VERCEL_PROJECT_ID`: Find in your Vercel project settings
4. Add these secrets to your GitHub repository:
   - Go to your GitHub repository
   - Click Settings > Secrets and variables > Actions
   - Add the three secrets mentioned above

Once set up, every push to main will automatically deploy to Vercel.

## License

MIT
