---
id: initial-deploy
title: Deploy for Production - Firestore
description: You can learn how to publish your Skeet app. You can also set deploy for each Commit with GitHub Actions with a single command.
---

In this chapter, we will create a VPN, configure load balancers, network security, routing, domain settings, etc.
Make the necessary settings for the production environment and deploy the application.

![画像](https://storage.googleapis.com/skeet-assets/animation/skeet-init-production.gif)

## Things to prepare in advance

For this chapter, in addition to the application created in the tutorial, you will need:

- **Domain to set for load balancer**

  Have a domain that allows you to change nameservers.

- **GitHub account**

  Prepare a GitHub account and perform login authentication.
  The _skeet init_ command creates a GitHub repository and
  Deploy with GitHub Actions is configured.

## Login GitHub CLI Auth

```bash
$ gh auth login
```

## Update Auth/Http instance options

In the tutorial we created an HTTP instance,
In order to allow access from the load balancer in a private network environment in the production environment,

Change the option to use from _publicHttpOption_ to _privateHttpOption_.

_functions/skeet/routings/http/addStreamUserChatRoomMessage.ts_

```typescript
〜
import { privateHttpOption } from '@/routings'
export const addStreamUserChatRoomMessage = onRequest(
  { ...privateHttpOption, secrets: [chatGptOrg, chatGptKey] },
  async (req: TypedRequestBody<AddStreamUserChatRoomMessageParams>, res) => {
〜
```

_functions/skeet/routings/auth/authOnCreateUser.ts_

```typescript
〜
import { privateHttpOption } from '@/routings'
export const authOnCreateUser = functions
  .runWith({
    ...authPrivateOption,
    secrets: [DISCORD_WEBHOOK_URL, SKEET_GRAPHQL_ENDPOINT_URL],
  })
〜
```

## Deploy for Production with Skeet Init command

Configure the following settings with the Skeet init command.

- Select Project ID
- Region selection
- Firebase login
- Specify GitHub repository name
- Nameserver domain settings
- Load balancer subdomain settings

```bash
$ skeet init
```

This command

- Create a GitHub repository
- Commit/push to GitHub repository
- Configure Actions for GitHub repositories
- Configuring secrets for GitHub repositories
- Google Cloud IAM settings
- Setting up Google Cloud DNS
- Configure Google Cloud Load Balancer
- Configure Google Cloud Armor
- Configuring Google Cloud VPC Network
- Configure Google Cloud VPC Subnet Network
- Configure Google Cloud VPC Connector

automatically.

Once configured, you will see the nameserver domain settings in the console log.

```bash
🚸 === Copy & Paste below nameServer addresses to your DNS Setting === 🚸

ns-cloud-a1.googledomains.com.
ns-cloud-a2.googledomains.com.
ns-cloud-a3.googledomains.com.
ns-cloud-a4.googledomains.com.

👷 === https will be ready in about an hour after your DNS settings === 👷

✔ You are all set 🎉

📗 Doc: https://skeet.dev
```

## Setting nameservers

Set the four records displayed above to your domain's nameservers.
The domain settings will be reflected in about 30 minutes to 2 hours after the settings are completed. (depending on your nameserver settings)

You have now completed your first deployment.

Let's go to https://lb.your-domain.com/root.

```json
{
  "status": "success",
  "message": "Skeet Backend is running!",
  "body": {}
}
```

is displayed, it is successful.

## Adding and synchronizing routes

If you added endpoints, you'll need to synchronize routing after deployment.
This will update the load balancer settings.

```bash
$ skeet sync routings
```

This command will

- Create network endpoint groups
- Create backend service
- Add backend service
- Apply security policy
- Create URL map

is done automatically.

## Add/Synchronize Cloud Armor

Sync the Cloud Armor configuration described in _skeet-cloud.config.json_.

_skeet-cloud.config.json_

```json
{
  "app": {
    "name": "skeet-example",
    "projectId": "skeet-example",
    "region": "asia-northeast1",
    "appDomain": "skeeter.dev",
    "functionsDomain": "lb.skeeter.dev"
  },
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-skeet-example-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "your IP address",
            "action": "allow"
          }
        },
        {
          "priority": "300",
          "description": "Defense from NodeJS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('nodejs-v33-stable')"
          }
        },
        {
          "priority": "2147483647",
          "description": "Deny All IP addresses",
          "options": {
            "action": "deny-403"
          }
        }
      ]
    }
  ]
}
```

By default, only the currently connected global IP is allowed to communicate.
Please change if necessary.

```bash
$ skeet sync armors
```

A new Google Cloud Armor is created or updated.
