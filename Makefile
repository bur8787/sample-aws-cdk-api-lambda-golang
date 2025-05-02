.PHONY: build
build:
	cd lambda && GOOS=linux GOARCH=amd64 go build -o bootstrap main.go

.PHONY: deploy
deploy: build
	cdk deploy
