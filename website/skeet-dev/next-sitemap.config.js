const appInfo = require('./appInfo')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${appInfo.domain}`,
  generateRobotsTxt: true,
}
