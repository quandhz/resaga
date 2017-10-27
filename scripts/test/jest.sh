#!/bin/sh -e

jest lib --collectCoverageFrom="lib/**/*.{js,jsx}" && open coverage/lcov-report/index.html

