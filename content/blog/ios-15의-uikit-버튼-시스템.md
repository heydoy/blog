---
path: UIKIt-button-system
date: 2022-07-05T11:11:29.253Z
title: iOS 15의 UIKit 버튼 시스템
description: WWDC 21의 UIKit 버튼 시스템을 리뷰하였습니다.
---


![버튼 이미지 ](../assets/screen-shot-2022-07-05-at-20.16.46.png)

[WWDC 2021 UIKit Button System](https://developer.apple.com/videos/play/wwdc2021/10064/)



### iOS 15에서 제공하는 버튼의 4가지 스타일

* Plain

* Gray

* Tinted

* Filled 


### 버튼의 추가적인 다른 특징들 

* Dynamic Type

* Multiline


* Accessibility

* Easier Customization 


### UIButton Configuration

```
let button = UIButton(type: .system)  
button.configuration = .filled()
button.setTitle("Button Text", for: [])

```



```
var config = UIButton.Configuration.tinted()
config.title = "Button Title"
config.image = UIImage(systemName: "cart")
config.imagePlacement = .trailing
addToCartButton = UIButton(configuration: config, primaryAction: ...)
```

```
addToCartButton.configurationUpdateHandler = {
  [unowned self] button in 
  var config = button.configuration
  config?.image = button.isHighlighted
      ? UIImage(systemName: "cart.fill.badge.plus")
      : UIImage(systemName: "cart.badge.plus")
  config?.subtitle = self.itemQuantityDescription
  button.configuration = config
}
```

```
private var itemQuantityDescription: String ? {
  didSet {
    addToCartButton.setNeedsUpdateConfiguration()
  }
}
```

###
Activity Indicator 

```
showActivityIndicator = true
```

### Metrics Adjustments





---











