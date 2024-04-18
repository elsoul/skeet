---
id: tutorial
title: Tutorial - Firestore
description: A tutorial on creating an AI chat application using the Skeet Framework.
---

# Tutorial - Firestore

In this tutorial, we will create an app that periodically evaluates articles with AI and sends notifications to Discord. This is a comprehensive tutorial on developing a cloud application that includes the TypeScript programming language and Firebase Firestore.

In the quick start, we learned the basics of using the Skeet Framework. In this tutorial, we will explore how the features of the skeet CLI can make things that were previously difficult to accomplish much easier. We extend our heartfelt thanks to the developers who have made their libraries available as open source.

The Skeet Framework is designed to efficiently use computer resources, enabling developers to achieve more with less code. Moreover, with the increasing seriousness of environmental issues on our planet, using energy efficiently is considered a responsibility of developers.

The techniques taught in this tutorial are fundamental for any Skeet Framework app and mastering them will provide a deep understanding of Skeet.

In this chapter, we will add new features to the project created in the quick start.

## Tutorial Goal

In this tutorial you will learn:

- Add endpoints using the _skeet add method_ command
- Synchronize routing using the _skeet sync routings_ command
- Add a schedule using the _skeet add method_ command
- Add a Cloud Tasks queue using the _skeet add tq_ command
- Synchronize Cloud Tasks using the _skeet sync tq_ command
- Deploy to Firebase

## Tutorial prerequisites

If [Setup](/ja/doc/skeet-firestore/setup) has not been completed, please complete it first.

## Development environment

Skeet Framework recommends VScode as the editor.
By proceeding with development according to the framework,
Get powerful code completion support using GitHub Copilot and OpenAI.

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

Chatbot uses OpenAI's API.

- [OpenAI](https://openai.com/)

## Add/synchronize routing

If you add endpoints, you must synchronize the routing after deployment.
This updates the load balancer settings.

```bash
$ skeet sync routings
```

This command allows

- Create network endpoint groups
- Create backend service
- Add backend service
- Applying security policy
- Create a URL map

is done automatically.

## Add/Synchronize Cloud Armor

Add the following settings to _skeet-cloud.config.json_

```json
{
  ...
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-example-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "x.x.x.x",
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

This setting allows access from the IP addresses specified in _src-ip-ranges_,
All other accesses are denied with _deny-403_.

```bash
$ skeet sync armors
```

A new Google Cloud Armor will be created or updated.
