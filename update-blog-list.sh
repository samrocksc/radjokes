#!/bin/bash

# Script to update the blog entries list
# This script generates a JSON file listing all markdown files in the blog/entries directory

echo "Updating blog entries list..."

# Create the entries directory if it doesn't exist
mkdir -p blog/entries

# Generate the list of markdown files
find blog/entries -name "*.md" -type f | sed 's|^blog/entries/||' | awk '{ print "\"blog/entries/" $1 "\""}' | paste -sd "," - > blog/entries/files.tmp

# Create the JSON file
echo "{ \"files\": [" > blog/entries/list.json
if [ -s blog/entries/files.tmp ]; then
    cat blog/entries/files.tmp >> blog/entries/list.json
fi
echo "] }" >> blog/entries/list.json

# Clean up temporary file
rm -f blog/entries/files.tmp

echo "Blog entries list updated at blog/entries/list.json"
