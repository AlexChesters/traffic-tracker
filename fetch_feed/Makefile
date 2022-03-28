.PHONY: clean venv test package

clean:
	rm -rf package.zip
	rm -rf build

venv:
	( \
			export PATH="${HOME}/.poetry/bin:${PATH}" && \
			poetry install \
	)

run: venv
	python3 fetch_feed/main.py

test: venv
	( \
			export AWS_ACCESS_KEY_ID='testing' && \
			export AWS_SECRET_ACCESS_KEY='testing' && \
			export AWS_SESSION_TOKEN='testing' && \
			export AWS_SECURITY_TOKEN='testing' && \
			export PATH="${HOME}/.poetry/bin:${PATH}" && \
			poetry run pylint fetch_feed \
	)

package: clean venv test
	bash package.sh
