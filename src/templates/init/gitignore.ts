import { SkeetTemplate } from '@/types/skeetTypes'

export const gitignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.gitignore`

  let body = ''
  if (template === SkeetTemplate.ExpoFirestore) {
    body = `
# Compiled JavaScript files
lib/**/*.js
lib/**/*.js.map

# TypeScript v1 declaration files
typings/

# Node.js dependency directory
node_modules/
keyfile.json
.env
functions/**/.env
functions/**/*.log
*.log
**/*.log

# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\.buckd/
*.keystore

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

*/fastlane/report.xml
*/fastlane/Preview.html
*/fastlane/screenshots

# Bundle artifacts
*.jsbundle

# CocoaPods
/ios/Pods/

# Expo
.expo/
web-build/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*


# local env files
.env*.local

# Gcloud key
gcloud-key.json

# env
.env

#firebase
.firebase
firebase-debug.log

# tmp
tmp/
firebase-export-*
.secret*
  `
  } else if (
    template === SkeetTemplate.NextJsFirestore ||
    template === SkeetTemplate.NextJsGraphQL
  ) {
    body = `
# Compiled JavaScript files
lib/**/*.js
lib/**/*.js.map

# TypeScript v1 declaration files
typings/

# Node.js dependency directory
node_modules/
keyfile.json
.env
functions/**/.env
functions/**/*.log
*.log

# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\.buckd/
*.keystore

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

*/fastlane/report.xml
*/fastlane/Preview.html
*/fastlane/screenshots

# Bundle artifacts
*.jsbundle

# CocoaPods
/ios/Pods/

# build
web-build/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*


# local env files
.env*.local

# Gcloud key
gcloud-key.json

# env
.env

#firebase
.firebase
firebase-debug.log

# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/
/web-build/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Gcloud key
gcloud-key.json

# env
.env

#firebase
.firebase
firebase-debug.log

#PWA
**/public/precache.*.*.js
**/public/sw.js
**/public/workbox-*.js
**/public/worker-*.js
**/public/fallback-*.js
**/public/precache.*.*.js.map
**/public/sw.js.map
**/public/workbox-*.js.map
**/public/worker-*.js.map
**/public/fallback-*.js

# tmp
tmp/
firebase-export-*
.secret*
  `
  } else if (template === SkeetTemplate.SolanaFirestore) {
    body = `
# Compiled JavaScript files
lib/**/*.js
lib/**/*.js.map

# TypeScript v1 declaration files
typings/

# Node.js dependency directory
node_modules/
keyfile.json
.env
functions/**/.env
functions/**/*.log
*.log

# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\.buckd/
*.keystore

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

*/fastlane/report.xml
*/fastlane/Preview.html
*/fastlane/screenshots

# Bundle artifacts
*.jsbundle

# CocoaPods
/ios/Pods/

# Expo
.expo/
web-build/
*.apk
android/
ios/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*


# local env files
.env*.local

# Gcloud key
gcloud-key.json

# env
.env

#firebase
.firebase
firebase-debug.log

# tmp
tmp/
firebase-export-*
.secret*

# Wallets

*wallet.json
*key.json
*keyfile.json
*keys.json
`
  }

  return {
    filePath,
    body,
  }
}
