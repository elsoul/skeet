---
'@skeet-framework/cli': patch
---

update firebase secret management

## Add/Update Firebase Secret

```bash
$ skeet add secret
```

## View Firebase Secret

```bash
$ skeet get secret
```

## Remove Firebase Secret

```bash
$ skeet delete secret
```

## Prune Unused Firebase Secrets

```bash
$ skeet delete secret --prune
```

Please note that this will delete all secrets that are not being used by any of your firebase functions.
※ Please delete the secret from the `./skeet-cloud.config.json` file as well.
