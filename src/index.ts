import express, { Request, Response } from 'express';
import i18n from 'i18n';
const os = require('os');
import router from './api/workflow';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  const result: any = {
		name: 'api-v1-workflow',
		version: '1.0.0',
		apiStartedAt: new Date(),
		host: os.hostname()
	};
	res.send(JSON.stringify(result));
});

i18n.configure({
  locales: ['en', 'fr', 'es'], // Supported languages (e.g., English, French, Spanish)
  directory: path.join(__dirname, 'locales'), // Directory for JSON files
  defaultLocale: 'en',
  objectNotation: true, // Use dot notation for nested translations
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
