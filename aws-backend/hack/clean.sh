#!/bin/bash

#!/bin/bash

#### Ship process ####
clean_process() {
  local mode="${1}"
  if [ "${mode}" == "dev" ] 
  then
    echo "Start the DEV clean process of CF Stack..."
    aws cloudformation delete-stack --stack-name coronavirus-tracker-website-dev-stack
    echo "=> Delete DEV Stack completed! ✅"
    echo "Confirming if the DEV Stack has been deleted..."
    aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'coronavirus-tracker-website-dev-stack')].StackStatus"
    echo "=> Success confirmation of removal for DEV Stack! ✅"
  else
echo "Start the PROD clean process of CF Stack..."
    aws cloudformation delete-stack --stack-name coronavirus-tracker-website
    echo "=> Delete PROD Stack completed! ✅"
    echo "Confirming if the PROD Stack has been deleted..."
     aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'coronavirus-tracker-website')].StackStatus"
    echo "=> Success confirmation of removal for PROD Stack! ✅"
  fi
}

clean() {
  local mode="${1}"
  clean_process "${mode}"
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
      clean "dev"
      ;;
    prod)
      clean "prod"
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