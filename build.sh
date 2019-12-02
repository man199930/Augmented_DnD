#!/bin/bash
pug index.pug
cat map0.yml | yq . >map0.json
cat inventaire.yml | yq . >inventaire.json
