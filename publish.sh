#!/bin/bash
if [[ $1 == "" ]]; then
	echo "Usage: ./publish.sh path/to/story/directory/"
	exit 1
fi
node lib/CLI.js compile $1
# Put up a local server of the story
# TODO build/ might not be the output directory. It's defined in fractive.json
node_modules/http-server/bin/http-server $1/build
exit $?
