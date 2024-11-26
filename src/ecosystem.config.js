module.exports = {
  apps: [
    {
      name: 'client',
      script: './src/client.js',
      watch: './src/client.js'
    },
    {
      name: 'server',
      script: './src/server.js',
      watch: './src/server.js'
    }
  ]
};
