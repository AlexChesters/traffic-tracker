.PHONY: clean venv test package

clean:
	rm -rf build

install:
	( \
			export PATH="${HOME}/.poetry/bin:${PATH}" && \
			poetry install \
	)

run:
	poetry run python3 write_to_table/main.py

test: install
	( \
			export AWS_ACCESS_KEY_ID='testing' && \
			export AWS_SECRET_ACCESS_KEY='testing' && \
			export AWS_SESSION_TOKEN='testing' && \
			export AWS_SECURITY_TOKEN='testing' && \
			export PATH="${HOME}/.poetry/bin:${PATH}" && \
			poetry run pylint write_to_table \
	)

package: clean install test
	bash package.sh
