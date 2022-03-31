.PHONY: clean test package install_poetry

clean:
	cd fetch_feed && $(MAKE) clean
	cd adapt_item && $(MAKE) clean

test:
	cd fetch_feed && $(MAKE) test
	cd adapt_item && $(MAKE) test

package:
	cd fetch_feed && $(MAKE) package
	cd adapt_item && $(MAKE) package

install_poetry:
	( \
		echo 'Installing poetry...' && \
		curl -sSL https://install.python-poetry.org | POETRY_HOME=${HOME}/.poetry python3 - \
	)

build: clean install_poetry test package
