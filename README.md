# :package: parse-env-to-secretmanager
We had a requirement to store our env files to secret manager so that we can fetch it in real time. I wrote a script for it and open sourcing it now.

## → How does it work

```
let environmentJson = parseFileSync(sourcePath)

storeJsonToFile(environmentJson) // store converted json to output.json file 

createSecret(environmentJson) // store secret in secret manager
```

# License
Licensed Under GPL 2.0.
