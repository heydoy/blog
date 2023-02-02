---
path: translate-avaudiosession-swift
date: 2023-02-02T02:31:31.265Z
title: "[번역][공식문서] AVAudiosession 클래스"
description: 앱에서 어떻게 오디오를 사용하는 지에 대해 시스템과 통신하는 개체
---
https://developer.apple.com/documentation/avfaudio/avaudiosession

아래는 공식문서를 번역한 내용입니다. 

-﻿--

`AVAudiosession` 앱에서 어떻게 오디오를 사용하는 지에 대해 시스템과 통신하는 개체

```swift
class AVAudioSession: NSObject
```

오디오 세션은 앱과 운영체제, 그리고 기본 오디오 하드웨어 사이의 중개 역할을 한다. 오디오 세션을 사용하여, 오디오 하드웨어와의 필수적인 상호작용이나 특정 동작에 대한 설명 없이,  앱 오디오의 일반적인 특성을 운영체제와 통신한다. 이러한 자세한 사항들에 대한 관리를 오디오 세션에 위임하게 되면, 운영체제는 사용자의 오디오 경험에 대해 가장 잘 관리할 수 있다. 

모든 iOS, tvOS, watchOS 앱은 기본 오디오 세션을 가지고 있고, 아래와 같은 동작이 사전 설정되어 있다. 

- 오디오 재생을 지원하지만 녹음은 허용 X (tvOS는 오디오 녹음 지원 X)
- iOS에서  벨소리/무음 스위치를 무음 모드로 설정하면 어떤 오디오가 앱에서 플레이 되더라도 무음 처리됨.
- iOS에서 화면 잠금을 하면 앱 오디오가 무음처리됨.
- 앱이 오디오를 재생할 때, 다른 백그라운드 오디오를 무음처리함

기본 오디오 세션이 유용한 동작을 제공하지만, 미디어 앱에서 필요한 오디오 동작을 제공하지는 않음. 오디오 기본 동작을 변경하기 위해서는 앱의 오디오 세션 카테고리를 설정해주어야 한다. 

사용할 수 있는 6가지의 카테고리가 있는데, [재생](https://developer.apple.com/documentation/avfaudio/avaudiosession/category/1616509-playback)은 재생 앱에서 가장 주로 사용하는 카테고리. 오디오 재생을 의미하는 이 카테고리는 벨소리/무음 스위치를 무음모드로 (iOS만) 설정해도 계속 재생이 된다. 이 카테고리를 사용하면 오디오, 에어플레이, PIP 백그라운드 모드를 사용하고 있다면, 백그라운드 오디오를 재생할 수 있다. 자세한 건 [백그라운드 오디오 활성화하기](https://developer.apple.com/documentation/avfoundation/media_playback/creating_a_basic_video_player_ios_and_tvos/enabling_background_audio)를 확인.

`AVAudioSession` 객체를 사용하여 앱의 오디오 세션을 설정. 이 클래스는 싱글톤 객체로 오디오 세션의 카테고리, 모드, 다른 구성들을 설정할 수 있다. 앱의 생명주기에 걸쳐서 오디오 세션과 상호작용할 수 있지만, 아래 예시처럼 주로 앱이 실행될 때 앱 설정을 수행하는 게 유용하다. 

```swift
func application(_ application: UIApplication, 
								didFinishLaunchingWithOptions 
                launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

	// 싱글톤 객체 받아오기
	let audioSession = AVAudioSession.sharedInstance()
	do {
		// 오디오 세션 카테고리, 모드, 옵션을 설정
		try audioSession.setCategory(.playback, mode: .moviePlayBack, options: [])
	} catch {
		print("오디오 세션 카테고리 설정에 실패했습니다.")
	}
	// 그 외 앱 실행 후 구성 
	return true
}
```

오디오 세션은 [setActive(_:)](https://developer.apple.com/documentation/avfaudio/avaudiosession/1616597-setactive) 또는 [setActive(_:options:)](https://developer.apple.com/documentation/avfaudio/avaudiosession/1616627-setactive) 메서드를 사용하여 세션을 활성화할 때 이 설정을 사용한다. 

<aside>

🗒️ 노트 
카테고리를 활성화 한 다음 언제든지 오디오 세션을 활성화할 수 있다. 하지만 일반적으로 이 설정은 앱이 오디오 재생을 하기 전까지 미루는 것이 선호된다. 활성화 호출을 미루는 것은 진행중인 다른 백그라운드 오디오를 너무 성급하게 방해하지 않을 수 있다.

</aside>