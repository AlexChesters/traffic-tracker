.PHONY: clean test package install_poetry

clean:
	cd fetch_feed && $(MAKE) clean

test:
	cd fetch_feed && $(MAKE) test

package:
	cd fetch_feed && $(MAKE) package

install_poetry:
	( \
		echo 'Installing poetry...' && \
		curl -sSL https://install.python-poetry.org | POETRY_HOME=${HOME}/.poetry python3 - \
	)
