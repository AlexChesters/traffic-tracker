.PHONY: clean venv test package

clean:
	rm -rf build

install:
	poetry install

run:
	poetry run handler

test: venv
	( \
			export AWS_ACCESS_KEY_ID='testing' && \
			export AWS_SECRET_ACCESS_KEY='testing' && \
			export AWS_SESSION_TOKEN='testing' && \
			export AWS_SECURITY_TOKEN='testing' && \
			poetry run pylint fetch_feed
	)

package: clean venv test
	bash package.sh
