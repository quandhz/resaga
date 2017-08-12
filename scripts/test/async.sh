#!/bin/sh -e

jest examples/async/src/containers --collectCoverageFrom="examples/async/src/containers/*.{js,jsx}"
