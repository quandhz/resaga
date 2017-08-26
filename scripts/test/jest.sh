#!/bin/sh -e

jest lib --collectCoverageFrom="lib/**/*.{js,jsx}" && codecov -t "a5b24ae1-ac37-4d2a-8c95-fa9558eaf91c"
