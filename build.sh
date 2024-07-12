#!/bin/sh

if [ "$VERCEL_ENV" == "production" ]
then
  npx @edgedb/generate@0.4.1 edgeql-js --output-dir ./edgedb --target esm --tls-security insecure -d production
else
	npx @edgedb/generate@0.4.1 edgeql-js --output-dir ./edgedb --target esm --tls-security insecure -d staging
fi