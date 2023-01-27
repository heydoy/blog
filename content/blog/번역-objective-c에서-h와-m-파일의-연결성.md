---
path: translate-connection-between-h-m-in-objc
date: 2023-01-27T02:30:26.699Z
title: "[번역] Objective-C에서 .h와 .m 파일의 연결성"
description: Objective-C를 처음 접하면 보게 되는 헤더파일과 구현파일에 대해서
---
[Connection between .h and .m files in Objective-C](https://victorleungtw.medium.com/connection-between-h-and-m-files-in-objective-c-eaf6b7366717)

본 글은 위 게시글의 번역, 요약 글입니다. 

---

Xcode에서 obj-C 프로젝트간의 연결성과 씬 뒤에 숨겨진 코드를 이해하는 것이 중요 하다.

클래스의 public이랑 private한 파트를 나누는데 사용이 됨. .h는 헤더 파일로 마치 API처럼 클래스의 public 선언을 하는 파일이고, .m파일은 비공개되는 구현을 함. 

다른 파일에서 함수를 호출하려고 할 때 참조를 위해 .h 파일을 import 해와야 한다. 

```objectivec
#import <Foundation/Foundation.h>
```

.h 파일에서 public @property를 클래스에 선언할 수 있음. 

```objectivec
@property (strong, nonatomic) NSString *something;
```

이 @property는 NSString 클래스 오브젝트의 포인터. 모든 오브젝트는 힙에 있으므로 *이 있어야함. 별개로 이* 의 뜻은 오브젝트 포인트를 프로퍼티가 nil로 설정되기 전까지 메모리에 유지하라는 뜻. nonatomic은 이 프로퍼티에 접근하는 것이 스레드 세이프하지 않다는 것. nonatomic이 아니면 컴파일러가 코드 잠금을 만들 것. 

.m 파일은 이 프로퍼티의 게터와 세터 메서드가 씬 뒤에서 자동적으로 생성해서 @property의 인스턴스를 접근가능하게 만듬.  

```objectivec
@synthsize something = _somthing;
- (NSString *) something
{
  return _something;
}
- (void)setSomething:(NSString *)something
{
  _something = something;
}
```

기본적으로 지원(backing) 변수 이름은 프로퍼티 이름과 동일하고 앞에 언더스코어(_)를 붙인 형태. 메서드를 오버라이드해서 다른 걸 하는 게 아니라면 위 코드를 작성할 필요는 없음. 

새로운 메서드를 작성할 때는 .h 파일 안에 선언을 두어야함. 

```objectivec
- (int)newMethod:(ArgType *)arg;
```

그리고 실제 자세한 부분은 .m 파일에 작성.

```objectivec
- (int)newMethod:(ArgType *)arg
{
  int num = 0;
  # something in the method...
  return num;
}
```

비공개로 선언할 때 .m 파일 안에 이런 식으로 작성. 

```objectivec
@interface Something()
#private declarations....
@end
```

다른 코드를 처음으로 읽을 때 .h 파일을 보고 프로젝트의 개요를 볼 수 있음. 자세하게 보려면 .m 파일.