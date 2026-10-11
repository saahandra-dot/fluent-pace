import 'dotenv/config';

import express from 'express';

const app = express();

const PORT =
    Number(process.env.PORT) || 3001;

app.use(express.json());

app.get('/health', (_request, response) => {
    response.json({
        status: 'ok',
    });
});

app.get(
    '/api/status',
    (_request, response) => {
        response.json({
            service:
                'language-learning-api',

            status:
                'ready',

            aiConnected:
                false,
        });
    },
);

app.listen(PORT, () => {
    console.log(
        `Language app server running on port ${PORT}`,
    );
});