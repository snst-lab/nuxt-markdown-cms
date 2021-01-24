# nuxt-markdown-cms

This is a template of the Markdown CMS.

<br>

## Feature

### Nuxt (client)

> - @nuxt/content
> - Composition API
> - SCSS Compiler

<br>

## Get Started

### 1. Clone this repository.

#### Option 1. SSH

```sh
 $ git clone -b template --depth 1 git@github.com:/nuxt-markdown-cms.git <project name>
```

#### Option 2. HTTPS

```sh
 $ git clone -b template --depth 1 https://github.com/nuxt-markdown-cms.git <project name>
```

### 2. Change Directory

```sh
  $ cd <project name>
```

### 3. Change Branch

> Example develop branch

```sh
  $ git checkout -b develop
```

### 4. Run command below to install npm modules

> Require both server & client directories

#### Option 1. Yarn

```sh
 $ cd server
 $ yarn install
```

#### Option 2. NPM

```sh
 $ cd client
 $ npm install
```

<br>

## Usage

### Launch development mode

> Web server starts on port 3000 proxyied to port 8080

```sh
 $ yarn dev
```

### Generate static HTML files

```sh
 $ yarn generate
```

<br>

## Requirement

### Node Version

```sh
>=10.20
```


<br>

## Directories

### Usermeta informations

> client/content/user/[userID]/meta.md

```md
---
id: 1
title: サイトタイトルのベース
description: サイトディスクリプションのベース
keywords: サイトキーワード
name: ユーザー名
name_en: 英語ユーザー名
avatar_link: https://github.com/snst-lab
menu_tags: TAG1, TAG2
list_tags_title: TAG Group1, TAG Group2
list_tags1: AWS,Azure,Firebase,CentOS,Docker,nginx,MariaDB,postfix  
list_tags2: Oracle Cloud,Rust,Java,TypeScript,Node.js

---

## GitHub
<a href="https://github.com/snst-lab" target="_blank" rel="noopener">
   <img src="/img/common/github-logo1.png" alt="Github Logo" style="width:160px;"/>
</a>
```


### Posts

> client/content/user/[userID]/post/*.md

```md
---
id: 1
date: 2021-01-01
tags: Vue.js,Laravel,Docker 
img: thumbnail.jpg
url: https://xxxxxxxxx.com/
public: 1
---

|  TH  |  TH  |
| ---- | ---- |
|  TD  | TD  |
|  TD  | TD  |
|  TD  | TD  |
|  TD  | TD  |
```

|  Key  |  Description  |
| ---- | ---- |
|  id  | posts will be sorted by id DESC  |
|  public  | 1: publish post / 0: unpublish post  |

