# Mattermost CSV to Bulk Import JSON Converter

<!-- [![CircleCI](https://circleci.com/gh/Brightscout/mattermost-etl.svg?style=shield&circle-token=3e834193f471812ea72217332aa0f5ff36825afe)](https://circleci.com/gh/Brightscout/mattermost-etl) [![Code Climate](https://codeclimate.com/github/Brightscout/mattermost-etl/badges/gpa.svg)](https://codeclimate.com/github/Brightscout/mattermost-etl) [![Test Coverage](https://codeclimate.com/github/Brightscout/mattermost-etl/badges/coverage.svg)](https://codeclimate.com/github/Brightscout/mattermost-etl/coverage)

An ETL framework to migrate data from Jabber to Mattermost. This utility exports data from a source Jabber database and generates a [Mattermost Bulk Loading](https://docs.mattermost.com/deployment/bulk-loading.html) import file. Eventually, we'll enhance this project to support migrations from other messaging sources.   -->


## Install

1. Install [Node.js](https://nodejs.org/en/) Version [18.15.0 LTS](https://nodejs.org/en/download/) or greater

2. Clone this repo  
`$ git clone https://github.com/Brightscout/mattermost-import-csv`

3. Install dependencies  
`$ cd mattermost-import-csv`  
`$ npm install` or `$ yarn install`

4. Run tests  
`$ npm test`

## Configure

Modify the values in `context/config.js` for the source, target

### Data to be imported must be valid
Some contraints to be aware of:

- `username` must be all lowercase (no capital letters)
- `email` must be all lowercase (no capital letters) [I think]

## Export

1. Execute the converter  
`$ npm start`

2. Inspect the output file, `target.json`, or whatever you set as the target filename. Ensure the results are as [expected](https://docs.mattermost.com/deployment/bulk-loading.html#data-format).

## Import

1. Run the Mattermost bulk loading command as explained [here](https://docs.mattermost.com/deployment/bulk-loading.html#running-the-bulk-loading-command)  
---

### RiffEdu bulk loading command procedure

- get the `import.json` (or whatever you name it) file to the RiffEdu instance in the ~/tmp directory
- find the container id of the `edu-stk_edu-mm` container (e.g. 78119bd4328b)

```
docker cp tmp/import.json 78119bd4328b:/home/mmuser/
docker exec -it 78119bd4328b bash
cd riffedu
bin/mattermost import bulk ~/import.json --validate
bin/mattermost import bulk ~/import.json --apply
exit
```




Made with &#9829; by [Brightscout](http://www.brightscout.com)
