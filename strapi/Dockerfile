FROM prawee/strapi:latest

USER root

RUN mkdir -p /opt/provider-install && cd /opt/provider-install && npm init -y >/dev/null && npm install --no-save --silent @strapi/provider-email-nodemailer@4.16.2 && cp -r node_modules/. /opt/node_modules/ && rm -rf /opt/provider-install

COPY config/plugins.js /opt/app/config/plugins.js
RUN chown node:node /opt/app/config/plugins.js

# Patch: allow admin reset password code to be reusable (keep resetPasswordToken)
COPY patches/auth.js /opt/node_modules/@strapi/admin/server/services/auth.js
# Patch: allow user (members) reset password code to be reusable
COPY patches/plugin-users-permissions-auth.js /opt/node_modules/@strapi/plugin-users-permissions/server/controllers/auth.js

USER node

EXPOSE 1337
CMD ["yarn", "start"]