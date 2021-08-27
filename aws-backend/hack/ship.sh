#!/bin/bash

#### Ship process ####
ship_process() {
  local mode="${1}"
  if [ "${mode}" == "dev" ] 
  then
    echo "Start the DEV build process of .aws-sam folder..."
    sam.cmd build -t template-dev.yaml
    echo "=> Build DEV completed! ✅"
    echo "Start the deployment process to AWS CloudFormation..."
    sam.cmd deploy --config-file samconfig-dev.toml
    echo "=> Deploy DEV completed! ✅"
  else
    echo "Start the PROD build process of .aws-sam folder..."
    sam.cmd build
    echo "=> Build PROD completed! ✅"
    echo "Start the deployment process to AWS CloudFormation..."
    sam.cmd deploy
    echo "=> Deploy PROD completed! ✅"
  fi
}

ship() {
  local mode="${1}"
  ship_process "${mode}"
}


err() {
    echo "$*" >&2
}

usage() {
    err "$(basename "$0"): [dev|prod]"
}

execute() {
  local task=${1}
  case "${task}" in
    dev)
      ship "dev"
      ;;
    prod)
      ship "prod"
      ;;
    *)
      err "invalid mode: ${task}"
      usage
      exit 1
      ;;
  esac
}

main() {
  if [ $# -ne 1 ]
  then
    usage;
    exit 1;
  fi
  local task=${1}
  execute "${task}"
}

main "$@"