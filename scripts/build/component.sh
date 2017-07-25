#!/bin/sh -e

export NODE_ENV=production
mkdir -p build
babel lib -s inline -d build/
