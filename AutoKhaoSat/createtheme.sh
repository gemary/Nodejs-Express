#!/bin/bash
vendor=$1
theme=$2
if [ ! -d $vendor/$theme ]; then
  mkdir $vendor;
  cd $vendor;
  mkdir $theme;
  cd $theme
  mkdir etc;
  mkdir web;
  mkdir media;
  touch theme.xml;
  touch registration.php;
  touch composer.json;
  cd web;
  mkdir css;
  mkdir js;
  mkdir images;
  mkdir fonts;
fi

