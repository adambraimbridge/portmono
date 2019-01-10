portmono
========

A portmanteau of &#34;port&#34; and &#34;mono&#34;.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/portmono.svg)](https://npmjs.org/package/portmono)
[![Downloads/week](https://img.shields.io/npm/dw/portmono.svg)](https://npmjs.org/package/portmono)
[![License](https://img.shields.io/npm/l/portmono.svg)](https://github.com/financial-times/portmono/blob/master/package.json)

This tool is designed to help building deploying services within monorepositories. It has two design principles:

1. Deploy local services.
2. Make local development easy.

# Contents
 <!-- toc -->
* [Contents](#contents)
* [Local Development](#local-development)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Local Development 

For usage with local development we currently support orchestrating [PM2](https://pm2.io/),
and you may use portmono to [generate an ecosystem file](https://pm2.io/doc/en/runtime/guide/ecosystem-file/) following the below example.

```
const {PM2Ecosystem} = require('portmono')
module.exports = PM2Ecosystem.ecosystem()
```

# Usage
<!-- usage -->
```sh-session
$ npm install -g portmono
$ portmono COMMAND
running command...
$ portmono (-v|--version|version)
portmono/0.0.0 darwin-x64 node-v11.6.0
$ portmono --help [COMMAND]
USAGE
  $ portmono COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`portmono deploy`](#portmono-deploy)
* [`portmono help [COMMAND]`](#portmono-help-command)
* [`portmono list`](#portmono-list)
* [`portmono validate`](#portmono-validate)

## `portmono deploy`

Deploy

```
USAGE
  $ portmono deploy

DESCRIPTION
  ...
  Deploys services within this monorepo.
```

_See code: [src/commands/deploy.js](https://github.com/antoligy/portmono/blob/v0.0.0/src/commands/deploy.js)_

## `portmono help [COMMAND]`

display help for portmono

```
USAGE
  $ portmono help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `portmono list`

List

```
USAGE
  $ portmono list

DESCRIPTION
  ...
  Lists services within this monorepo.
```

_See code: [src/commands/list.js](https://github.com/antoligy/portmono/blob/v0.0.0/src/commands/list.js)_

## `portmono validate`

Validate

```
USAGE
  $ portmono validate

DESCRIPTION
  ...
  Validates the service configuration file.
```

_See code: [src/commands/validate.js](https://github.com/antoligy/portmono/blob/v0.0.0/src/commands/validate.js)_
<!-- commandsstop -->
