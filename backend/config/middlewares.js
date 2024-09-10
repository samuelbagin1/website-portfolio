// Path: ./config/middleware.js
module.exports = ({ env }) => ({
  load: {
    before: [
      'strapi::logger',
      'strapi::errors',
      'strapi::security',
      'strapi::cors',
      'strapi::poweredBy',
      'strapi::query',
      'strapi::body',
      'strapi::session',
      'strapi::favicon',
      'strapi::public',
    ],
  },
  settings: {
    cors: {
      enabled: true,
      origin: env('CORS_ORIGIN', 'http://localhost:3000, http://website-portfolio-head-1o44bift8-samuelbagins-projects.vercel.app').split(',').map(origin => origin.trim()),
      headers: ['*'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    },
  },
});