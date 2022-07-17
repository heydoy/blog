---
path: Swift-Naver-REST API-Book Search-JSON
date: 2022-07-18T14:50:08.884Z
title: Swift에서 네이버 REST API 이용해서 책 검색 내용 가져오기 - 1 일반검색
description: JSON 형태로 가져온 책검색 데이터 목록을 테이블뷰로 보여줍니다.
---
\-

작성중

### 데이터 내의 HTML 태그 지우기

`String` 구조체의 메서드 중 `.replacingOccurences()`를 이용해 HTML 태그를 지울 수 있습니다. 정규식을 이용해 <> 형태로 된 단어들을 빈 문자열로 대체합니다.



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