#!/bin/sh -e

./scripts/test/lint.sh
./scripts/test/jest.sh
 codecov -t "a5b24ae1-ac37-4d2a-8c95-fa9558eaf91c"
