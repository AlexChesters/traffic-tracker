clean:
	rm -rf build

install:
	npm ci

run:
	npm start

test: install
	npm test

package: clean install test
	 package.sh
