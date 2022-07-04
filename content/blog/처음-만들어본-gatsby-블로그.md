---
path: my-first-gatsby-blog
date: 2022-07-04T12:03:21.232Z
title: 처음 만들어본 Gatsby 블로그
description: Gatsby, Netlify를 이용하여 처음으로 블로그를 만들었습니다.
---
## 들어가며

저는 제작년부 사용하고 있는 티스토리 블로그([kimdee.tistory.com](https://kimdee.tistory.com/))가 있는데요. 애드센스를 붙인 블로그라서 깔끔하지 않고, 개발 공부를 하면서 직접 블로그를 만들어보고 싶다는 생각이 들었습니다. 현재 참여하고 있는 [SESAC iOS 교육 과정](https://sesac.seoul.kr/course/active/detail.do) 에서 TIL을 올리는 블로그를 다같이 공유하게 되서 그 김에 오랜 숙원이었던 블로그를 만들게 되었어요.  

---

## 고민 과정
가장 크게는 git 블로그를 생각해두고 있었는데요. 맘에 드는 템플릿을 못찾기도 했고, 팔로우하는 개발자 분 중에 [안희종님이 만든 개인 홈페이지](https://ahnheejong.name/)가 깔끔하고 예뻐서 찾아보 gatsby+netlify를 이용해 배포하셨더라고요. 그래서 바로 gatsby 부터 찾아보게 되었습니다.

---

## 삽질의 과정 
저는 Gatsby에서 제공하는 [blog-netlify-cms-tutorial](https://www.gatsbyjs.com/tutorial/blog-netlify-cms-tutorial/) 링크를 따라가면서 했는데요. gatsby-cli를 설치하려고 쉘에서 아래 명령어를 입력했는데 그때부터 약간의 삽질이 시작됐어요. 
```
npm install -g gatsby-cli
```
npm은 예전에 react native를 ~잠깐 공부하면서 설치해두었는데 node 버전이 14.15 이상이어야 되고 현재 제 버전은 node 12.x 버전이어서 gatsby-cli를 설치할 수 없었습니다. 

그래서 brew를 통해서 update를 하려고 하니 

```
node@12: undefined method `cellar' for #<BottleSpecification:0x00007fa8e75d54e8>
```
이런 경고메시지가 뜨고 설치가 되지 않았습니다. 
Homebrew 깃허브에서도 나온 [이슈](https://github.com/Homebrew/discussions/discussions/2599) 인데 나왔던 답변들을 적용해봐도 잘 되지 않아서결국 homebrew 부터 지우고 다시 설치하게 되었습니다.

### brew 설치 
[brew 홈페이지](https://brew.sh/) 

- 아래 코드를 커맨드 창에서 입력하여 brew를 제거 
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"

```

- brew 설치 
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```


### npm, node, nvm 

- 노드 설치

```
brew install node
```


- 버전 확인 
```
node -v
```
```
npm -v 
```

-  nvm(노드 버전 매니저) 설치

```
brew install nvm
```
설치만 하면 PATH에 등록이 안되어 커맨드에서 nvm 명령어를 쓸 수 없어서 그 부분을 처리해주어야 합니다.

```
mkdir ~/.nvm
```
먼저 디렉토리를 생성해준 후 

```
vi ~/.bash_profile
```
bash_profile에서 i를 눌러서 INSERT 모드로 바꾼 후 아래 내용을 입력해줍니다.

```
# Setting PATH for NVM
export NVM_DIR="$HOME/.nvm"
. "/usr/local/opt/nvm/nvm.sh"
```
입력 후 ESC 키를 누른 후 :wq 를 입력하여 저장 및 편집기를 종료합니다.

```
nvm -v
```

버전을 확인하여 설치가 잘 되었는지 확인합니다.

- 노드 버전 선택 설치

Gatsby에 올라온 [글](https://www.gatsbyjs.com/docs/upgrading-node-js/) 을 참고하였습니다.

2022년 기준 gatsby가 지원하는 node.js 버전이 14.15 이상이라고 해서 저는 16 버전을 설치하였습니다.

```
brew install node@16

nvm install 16
nvm alias default 16
```

```
node -v
```

이제 노드 버전을 확인하면 새로 설치한 16버전임을 확인할 수 있습닌다. 



### gatsby 

gatsby-cli를 드디어 설치합니다.

```
npm install -g gatsby-cli
```


### new gatsby blog [!]
다시 [튜토리얼](https://www.gatsbyjs.com/tutorial/blog-netlify-cms-tutorial/)로 돌아가서 블로그를 만듭니다.

이 개츠비 이는 [gatsby-personal-starter-blog](https://github.com/thomaswangio/gatsby-personal-starter-blog)를 이용해 만듭니다.

블로그 프로젝트를 만들 경로에서 아래 명령어를 쉘 입력합니다.

```
gatsby new [your-project-name] https://github.com/thomaswangio/gatsby-personal-starter-blog

```

인스톨이 끝나면 프로젝트 이름으로 만ㄴ들어진 디렉토리로 이동하여 패키지를 설치합니다.

```
cd [your-project-name] 
gatsby develop
```
설치가 끝나면 블로그 사이트를 로컬에서 돌려볼 수 있습니다.

[http://localhost:8000](http://localhost:8000) 이 링크에서 사이트를 볼 수 있고 아직 연동은 하지않았지만 미리 설치된 Netlify CMS를 [http://localhost:8000/admin](http://localhost:8000/admin) 에서 확인할 수 있습니다.

### github

- config.yml 수정 

static/admin/config.yml 에서 backend에 name과 레포를 각각 github , 깃허브 사용자이름/레포이름 으로 변경합니다.

```
backend:
  name: github
  repo: your-username/your-repo-name
```

이제 본인의 깃허브계정에서 위에 config.yml에 입력한 레포 이름대로 새로운 레포를 만듭니다. 

그 다음 블로그 프로젝트가 있는 디렉토리에서 git을 설정하고 github에 만들어둔 레포지토리와 연결합니다.

```
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/[your-username]/[your-repo-name].git
git push -u origin master

```




### netlify 

- Netlify 배
[app.netlify.com](https://app.netlify.com) 에 들어가서 "New Site from Git"으로 아까 만든 레포와 연결합니다.

- Netlify CMS의 액세스 설
[Github OAuth Apps](https://github.com/settings/developers)로 이동하여, netlify에서 사용할 새로운 auth provider를 만듭니다.


---

드디어 블로그 kimdee.netlify.app 이 생겼습니다.

src/components/layout.js 와 src/templates/blog-post.js, src/pages/index.js 를 조금씩 수정해서 지금의 심플한 블로그 모양을 만들었는데요. 

처음에는 뭘 수정해야 바뀌는지 몰라서 하나하나 js 파일을 열어서 페이지와 비교했는데, 그래도 얼추 깔끔해진 것 같아요! 

앞으로 포스팅을 하면서 조금씩 디자인을 발전해 나가봐야겠습니다. 




