---
path: swift-kakao-rest-api
date: 2022-07-15T00:10:05.989Z
title: Swift에서 카카오 REST API 이용해서 책 검색 내용 가져오기
description: Kakao API와 Alamofire 이용해서 JSON 데이터를 가져와봅니다.
---
## 목표

* KaKao REST API 등록하기 
* API로 책을 검색한 내용을 가져오기
* JSON 데이터를 Codable한 구조체로 가져오기 
* 검색결과 중 첫번째 항목을 화면에 보여주기

## 카카오 API 등록하기

![](../assets/screen-shot-2022-07-15-at-23.44.25.png)


[Kakao Developers](https://developers.kakao.com/console/app) 에 서 애플리케이션을 등록하면 앱 키를 받을 수 있다. 이 중 REST API 키를 사용할 예정이다. 



### JSON 데이터를 가져올 구조체 선언

```
struct BookResult: Codable {
    
    let documents: [BookInfo]
}

struct BookInfo: Codable {
    let authors: [String]  // 작가들 배열
    let contents: String  //소개글
    let datetime: String //출간일?
    let isbn: String // ISBN
    let price: Int // 정상가
    let publisher: String // 출판사
    let sale_price: Int // 세일가
    let status: String // 정상판매 여부
    let thumbnail: String // 이미지링크
    let title: String // 책제목
    let translators: [String] // 번역가 배열
    let url: String // 책검색결과 링크
}
```

### 데이터를 Alamofire로 Fetch해오는 함수

```
func fetchSearchResult(
        completionHandler: @escaping (Result<BookResult, Error>)-> Void
    ) {
        let url = "https://dapi.kakao.com/v3/search/book"
        let headers: HTTPHeaders = [
            "Authorization" : "KakaoAK (REST API )"
        ]
        let body: Parameters = [
            "query" : self.query

        ]
        
        AF.request(url,
                   method: .get,
                   parameters: body,
                   headers: headers)
        .responseData(completionHandler: { response in
            switch response.result {
            case let .success(data) :
                do {
                    let decoder = JSONDecoder()
                    let result = try decoder.decode(BookResult.self, from: data)
                    completionHandler(.success(result))
                    
                } catch {
                    completionHandler(.failure(error))
                }
            case let .failure(error) :
                completionHandler(.failure(error))
            }
    
        })
    }
```

### 키워드를 입력 후 검색 버튼 눌렀을 때 fetch하는 함수 호출하기

#### 키워드 입력 시 저장

```
 @IBAction func queryEditingChanged(_ sender: UITextField) {
        let text = sender.text ?? ""
        
        self.query = text
    }
    
```

#### 검색 버튼 입력시 fetch 호출

```
    @IBAction func didButtonTapped(_ sender: UIButton) {
        searchHelper()
        
        
    }
```

#### fetch를 도와주는 함수

```
    func searchHelper() {
        self.fetchSearchResult ( completionHandler: {[weak self] result in
            guard let self = self else { return } // 일시적으로 self가 strong reference로 만들게 하는 작업
                       switch result {
                       case let .success(result) :
                           debugPrint("success \(result)")
                           self.configureResult(result: result.documents[0])
                       case let .failure(error) :
                           debugPrint("error \(error)")
           }
            
        })
    }
```

### 검색한 결과 중 첫번째를 화면에 보여주기

```
    func configureResult( result: BookInfo) {
        self.resultTextView.text = result.contents
        let url = URL(string: result.thumbnail)
        DispatchQueue.global().async {
            let data = try? Data(contentsOf: url!)
            DispatchQueue.main.async {
                self.resultImageView.image = UIImage(data: data!)
            }
        }
    }
```