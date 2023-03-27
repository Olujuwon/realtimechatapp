#!/bin/bash

echo "......... Env processing started .............."

# Recreate config file
##rm -rf ./env-config.js
touch ./.env-sample

# Add assignment
#echo "window._env_ = {" >> ./env-config.js
NUMBER_OF_LINES=10
NUMBER_OF_WRITTEN_LINES=0

# Read each line in .env file
# Each line represents key=value pairs
while [$NUMBER_OF_WRITTEN_LINES -le $NUMBER_OF_LINES ];
do
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
done < .env

echo "}" >> ./env-config.js

echo "......... Env processing completed .............."