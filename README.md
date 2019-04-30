# :package: parse-env-to-secretmanager
We had a requirement to store our env files to secret manager so that we can fetch it in real time. I wrote a script for it and open sourcing it now.

Thanks to (https://github.com/bevry/envfile) for making things easy for me.

## → How does it work

```
let environmentJson = parseFileSync(sourcePath) // parsing env to json

storeJsonToFile(environmentJson) // store converted json to output.json file 

createSecret(environmentJson) // store secret in secret manager
```

note: you can either pass file pass as a command line argument (node index.js filename) or change `sourcePath` variable.

# License
Licensed Under GPL 2.0.
