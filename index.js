// Include envfile
const fs = require('fs')
const AWS = require('aws-sdk')

AWS.config.update({accessKeyId: '', 
secretAccessKey: '', 
region:''});

const secretsmanager = new AWS.SecretsManager({apiVersion: '2017-10-17'});
const sourcePath = process.argv.slice(2)[0] || '.env'

function parseFileSync(filePath) {
	// Read
	const data = fs.readFileSync(filePath)

	// Check the result
	if (isError(data)) {
		// An error occured
		return data
	} else {
		// Parse the result
		return parseSync(data.toString())
	}

}

function parseSync(src) {
	// Try parse JSON
	try {
		return JSON.parse(src.toString())
	} catch (err) {
		// Try parse envfile stringty
		const result = {}
		const lines = src.toString().split('\n')
		for (const line of lines) {
      const match = line.match(/^([^=:]+?)[=:](.*)/)
			if (match) {
				let key = match[1].trim()
        let value = match[2].trim()
        if ( value.charAt(0) == '\''){
          value = value.slice(1, -1)
        }
				result[key] = value
			}
		}
		return result
	}
}

function isError(value) {
	return value instanceof Error
}

function storeJsonToFile(jsonContent){
  fs.writeFile("output.json",  JSON.stringify(jsonContent), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
}); 
}

function createSecret(env_json){
  var params = {
    Description: "My test database secret created with the SDK", 
    Name: "TEST_SECRET", 
    SecretString: JSON.stringify(env_json)
  };
  secretsmanager.createSecret(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}


// let environmentJson = parseFileSync(sourcePath)

// storeJsonToFile(environmentJson)

// createSecret(environmentJson)