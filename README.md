# LLM Proxy UI

A web-based user interface for managing LLM (Large Language Model) Proxy configurations in the Anypoint Platform.

## Features

- **LLM Proxies Dashboard**: View and manage all your LLM proxy instances
- **Cost Configuration**: Configure input/output costs per million tokens for each LLM model
- **List Pricing Options**: Apply list pricing globally or per model
- **Model & Provider Management**: Add custom models with dropdown selection or free text entry
- **Proxy Details**: View detailed information about each proxy instance
- **Try Out Interface**: Test your LLM proxies with custom prompts

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- A Heroku account (for deployment)

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd llm-proxy-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
llm-proxy-app/
├── public/                      # Static HTML files
│   ├── llm-proxy-list.html     # Main dashboard
│   ├── llm-proxy-costs.html    # Cost configuration
│   ├── llm-proxy-details.html  # Proxy details view
│   └── llm-proxy-tryout.html   # Test interface
├── server.js                    # Express server
├── package.json                 # Dependencies and scripts
├── Procfile                     # Heroku process file
├── app.json                     # Heroku app configuration
└── README.md                    # This file
```

## Heroku Deployment

### Option 1: Using Heroku CLI

1. **Install Heroku CLI**
   ```bash
   brew install heroku/brew/heroku  # macOS
   # or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Initialize git repository (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

5. **Deploy to Heroku**
   ```bash
   git push heroku main
   ```

6. **Open your app**
   ```bash
   heroku open
   ```

### Option 2: Using Heroku Dashboard

1. Log in to [Heroku Dashboard](https://dashboard.heroku.com/)
2. Click "New" → "Create new app"
3. Enter your app name and choose a region
4. Go to the "Deploy" tab
5. Connect your GitHub repository
6. Enable automatic deploys (optional)
7. Click "Deploy Branch"

### Option 3: Deploy Button

Add this to your README to enable one-click deployment:

```markdown
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
```

## Environment Variables

Currently, no environment variables are required. The app uses sensible defaults:

- `PORT`: Automatically set by Heroku (defaults to 3000 locally)
- `NODE_ENV`: Set to `production` on Heroku

## API Routes

- `GET /` - LLM Proxies listing page
- `GET /details` - Proxy details page
- `GET /costs` - Cost configuration page
- `GET /tryout` - Try out/test page
- `GET /health` - Health check endpoint

## Health Check

The application includes a health check endpoint at `/health` that returns:

```json
{
  "status": "healthy",
  "timestamp": "2026-03-28T12:00:00.000Z"
}
```

## Monitoring

To view logs on Heroku:

```bash
heroku logs --tail
```

## Scaling

To scale your application:

```bash
heroku ps:scale web=1
```

## Troubleshooting

### App not loading
- Check logs: `heroku logs --tail`
- Verify the app is running: `heroku ps`
- Check health endpoint: `curl https://your-app-name.herokuapp.com/health`

### Port binding issues
- Ensure your app uses `process.env.PORT`
- Heroku dynamically assigns the port

### Build failures
- Verify Node.js version in `package.json` matches Heroku requirements
- Check that all dependencies are listed in `package.json`
- Ensure `Procfile` is committed to git

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

MIT

## Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team
