---
  id: skeet-cli-curl
  title: Skeet Curl Command
  description: skeet curl command
---

Skeet Curl Command is a command to call the Cloud Functions endpoint for Dev.

** ⚠️ Please run _skeet login_ command to set _ACCESS_TOKEN_ in your env for Authorization ⚠️ **

```bash
skeet help curl
Usage: skeet curl [options] <methodName>

Skeet Curl Command - Call Cloud Functions Endpoint for Dev

Arguments:
  methodName                  Method Name - e.g. skeet curl createUserChatRoom

Options:
  -d,--data [data]            JSON Request Body - e.g. '{ "model": "gpt4", "maxTokens": 420 }'
  -r, --raw                   Show chunk data (default: false)
  -p, --production            For Production (default: false)
  -f,--functions [functions]  For Production Functions Name (default: false)
  -h, --help                  display help for command
```
