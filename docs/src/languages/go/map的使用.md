
## 1.初始化
:::info
引用类型要初始化
:::
```go
创建一个Map
	cityMap := make(map[string]string, 100)
```

## 2.写入数据
```go
	//写入数据
	cityMap["北京"] = "BeiJin"
	cityMap["重庆"] = "ChongQing"
	cityMap["成都"] = "ChengDu"
```

## 3.遍历
```go
	//遍历
	for key, value := range cityMap {
		fmt.Printf("key:%s------value:%s\n", key, value)
	}
```
    
## 4.删除
```go
	//删除
	delete(cityMap, "重庆")
```

## 5.获取元素,并且判断是否存在
```go
	//获取元素,并且判断是否存在
	value, ok := cityMap["北京"]
	if ok {
		fmt.Println(value)
	} else {
		fmt.Println("Not Found")
	}
```

