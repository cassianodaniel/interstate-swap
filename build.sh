#!/bin/sh

echo "VERCEL_ENV: $VERCEL_ENV"

if [ "$VERCEL_ENV" == "production" ]
then
  npx @edgedb/generate@0.4.1 edgeql-js --output-dir ./edgedb --target esm --tls-security insecure -d permutas-main
else
	npx @edgedb/generate@0.4.1 edgeql-js --output-dir ./edgedb --target esm --tls-security insecure -d permutas-develop
fi