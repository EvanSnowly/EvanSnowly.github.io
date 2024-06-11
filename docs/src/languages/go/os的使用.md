## 1.文件的打开和关闭

```go
file, err := os.Open("lib-os/main.go")
	if err != nil {
		fmt.Println("打开失败", err)
	}

	fmt.Println(file)

	defer file.Close()

```

## 2.文件写入

```go
file, err := os.Create("file/test1.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	file.WriteString("我是SB")

	defer file.Close()

```

## 3.读取文件

```go
file, err := os.Open("file/test1.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	sb := make([]byte, 124)
	file.Read(sb)
	fmt.Println(string(sb))
	defer file.Close()
```

## 4.拷贝文件

```go
   //目标文件
	dstFile, err := os.Create("file/copy2.txt")
	if err != nil {
		fmt.Println("创建文件失败")
	}
	//资源文件
	srcFile, err := os.Open("file/copy1.txt")
	if err != nil {
		fmt.Println("读取文件失败")
		return
	}

	//缓冲去
	buf := make([]byte, 1024)

	for {
		//从dst读取数据
		n, err := srcFile.Read(buf)
		if err == io.EOF {
			fmt.Println("读取完毕")
			break
		}
		if err != nil {
			fmt.Println("未知读取异常")
			break
		}

		//写出去
		dstFile.Write(buf[:n])

	}

	defer srcFile.Close()
	defer dstFile.Close()
```

## 5.工具函数
::: info
原来的 ioutil 被弃用了
:::

```go
//直接读取
	content, err := os.ReadFile("file/copy1.txt")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(content))

	直接写出
	os.WriteFile("file/directOut.txt", []byte("我卢本伟没有开挂"), 0006)
```
