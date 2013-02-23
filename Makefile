MOCHA_OPTS=
REPORTER = dot

test: test-unit

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		tests/*


.PHONY: test test-unit