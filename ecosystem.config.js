module.exports = {
    apps: [
        {
            name: 'db-productions',
            script: 'bun',
            args: 'run start',
            env: {
                PORT: 3001,
                NODE_ENV: 'production',
            },
        },
    ],
};
