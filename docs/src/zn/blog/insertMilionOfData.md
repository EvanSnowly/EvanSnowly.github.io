# 使用的技术
Gorm Goroutine Mysql

## 1. 创建数据库表
```sql
create table users
(
    id       int auto_increment
        primary key,
    username varchar(50)  not null,
    password varchar(100) not null,
    phone    varchar(20)  not null,
    address  varchar(255) not null,
    nickname varchar(50)  not null
);
```


## 2. 创建结构体

```go
type User struct {
	Id       int64  `gorm:"column:id;type:INT;PRIMARY_KEY;AUTO_INCREMENT;"`
	Username string `gorm:"column:username;type:VARCHAR(50);NOT NULL"`
	Password string `gorm:"column:password;type:VARCHAR(100);NOT NULL"`
	Phone    string `gorm:"column:phone;type:VARCHAR(20);NOT NULL"`
	Address  string `gorm:"column:address;type:VARCHAR(255);NOT NULL"`
	Nickname string `gorm:"column:nickname;type:VARCHAR(50);NOT NULL"`
}
```

## 3. 创建数据源
注意：在这里设置一个慢 SQL 时间，以避免日志 IO 影响性能。
```go
 newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second * 200, // Slow SQL threshold // [!code warning]
			LogLevel:                  logger.Silent,     // Log level
			IgnoreRecordNotFoundError: true,              // Ignore ErrRecordNotFound error for logger
			ParameterizedQueries:      true,              // Don't include params in the SQL log
			Colorful:                  false,             // Disable color
		},
	)
	dsn := "root:123456@tcp(127.0.0.1:3306)/db_master1?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	sqlDb, _ := db.DB()
	sqlDb.SetMaxIdleConns(20)
```

## 4. 生成测试数据方法

```go
func getUser() User {
	user := User{
		Username: fmt.Sprintf("user%d", rand.Intn(10000)),
		Password: fmt.Sprintf("password%d", rand.Intn(10000)),
		Phone:    fmt.Sprintf("1%d", rand.Intn(100000000)),
		Address:  fmt.Sprintf("address%d", rand.Intn(1000)),
		Nickname: fmt.Sprintf("nickname%d", rand.Intn(1000)),
	}

	return user
}
```
## 5. 批量插入方法
```go
func batchInsert(num int) {
	defer wg.Done()
	users := []User{}

	for i := 0; i < num; i++ {
		users = append(users, getUser())
	}
	db.Create(&users)
}

```

## 6. 主程序
使用 WaitGroup 等待所有 goroutine 完成。创建 100 个 goroutine，每个插入 10,000 条记录。Go 默认利用所有可用的 CPU 核心。

```go
var wg sync.WaitGroup

func main() {
	now := time.Now()

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go batchInsert(10000)
	}
	wg.Wait()
	now1 := time.Now()
	spend := now1.Sub(now).Seconds()
	fmt.Println("time consuming:", spend)

}
```
## 7. 结论
配置：第 11 代英特尔(R) 酷睿(TM) i5-11260H @ 2.60GHz 2.61 GHz 16GB RAM <br>
耗时：9.1486998

::: warning
由于批量 SQL 生成时占位符超过六万，只能一次插入 10,000 条记录。
:::
