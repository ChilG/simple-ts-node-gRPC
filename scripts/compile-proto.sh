#!/bin/bash

# Get the directory of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Paths
PROTO_DIR="$DIR/../proto"
OUT_DIR="$DIR/../src/generated"

# Create output directory if it doesn't exist
mkdir -p $OUT_DIR

# Compile protobuf files
npx grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=$OUT_DIR \
  --ts_proto_opt=outputServices=grpc-js \
  --proto_path=$PROTO_DIR \
  $PROTO_DIR/*.proto
