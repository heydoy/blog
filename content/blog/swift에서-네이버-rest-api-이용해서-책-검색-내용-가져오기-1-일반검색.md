---
path: Swift-Naver-REST API-Book Search-JSON
date: 2022-07-18T14:50:08.884Z
title: Swift에서 네이버 REST API 이용해서 책 검색 내용 가져오기 - 1 일반검색
description: JSON 형태로 가져온 책검색 데이터 목록을 콜렉션뷰로 보여줍니다.
---
## 들어서며

지난번에 카카오 API에서 다룬 바와 같이 Alamofire를 이용해 동일한 형태의 함수를 이용하기 때문에 이번에는 콜렉션 뷰를 이용해 전체 검색결과를 불러옵니다. 카카오와 다르게 네이버의 경우 검색결과에 HTML 태그가 포함되서 오므로, 정규식을 활용하여 문자열을 대체하는 메서드도 사용해봅니다. 

## 목표

* Naver REST API 등록하기
* API로 책 검색한 내용 가져오기
* 콜렉션 뷰로 검색한 내용 목록을 스크롤해서 보여주기 

- - -

## 시작하기

### 네이버 API 등록하기

![](../assets/screen-shot-2022-07-18-at-22.01.57.png)

네이버의 책 검색을 하기 위해서는 [네이버 개발자 사이트](https://developers.naver.com/apps/#/register)에서 로그인 후 **\[Application] > \[애플리케이션 등록]** 을 해야합니다.

![](../assets/screen-shot-2022-07-18-at-22.01.47.png)

애플리케이션 이름, 사용 API, 개발 환경을 추가해야합니다. 한 번 등록하면 따로 개발하는 앱과 웹의 정보 없이도 자동적으로 여러 환경에 대한 APP KEY가 나오는 카카오와 달리, 개발하고 있는 앱의 번들 ID, 웹의 링크를 최소 하나 이상 추가해야합니다. 저는 검색 API만 사용하여 iOS 환경만 개발할 예정이므로 위와 같이 선택했지만, 드롭다운 메뉴를 눌러 사용하려는 API와 환경을 계속 추가할 수 있습니다. 

혹시 처음 등록할 때 추가하지 않았더라도, [내 애플리케이션]에 들어가서 API 설정을 통해 사용하는 API와 환경을 추가할 수 있습니다. 


![](../assets/screen-shot-2022-07-18-at-22.00.05.png)

이제 [Application] > [내 애플리케이션]에서 아까 등록한 앱을 선택해서 들어가면 클라이언트 ID와 클라이언트 Secret을 확인할 수 있습니다. 이 값들은 나중에 네트워킹할 때 헤더 영역에 각각 **X-Naver-Client-Id**, **X-Naver-Client-Secret** 키에 밸류로 들어가게 될 값들입니다. 

- - -

### 데이터 내의 HTML 태그 지우기

`String` 구조체의 메서드 중 `.replacingOccurences()`를 이용해 HTML 태그를 지울 수 있습니다. 정규식을 이용해 HTML 태그 형태로 된 단어들을 빈 문자열로 대체합니다.

```
bookContentsLabel.text = result.description.replacingOccurrences(
            of: #"<[^>]+>"#,
            with: "",
            options: .regularExpression,
            range: nil)
```

- - -

## 완성화면

![](../assets/simulator-screen-recording-iphone-11-2022-07-18-at-00.31.39.gif)