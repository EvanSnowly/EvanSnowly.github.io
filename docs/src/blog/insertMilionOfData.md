# Technologies Used
Gorm Goroutine Mysql

## 1. Create Database Table

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

## 2.  Create Struct

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

## 3.Create Data Source
Note: Set a slow SQL time here to avoid logging IO affecting performance.
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

## 4.Generate Test Data Method
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

## 5.Batch Insert Method
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

## 6.Main Program
Use WaitGroup to wait for all goroutines to complete. Create 100 goroutines, each inserting 10,000 records. Go utilizes all available CPU cores by default.

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
## 7.Conclusion
Configuration: 11th Gen Intel(R) Core(TM) i5-11260H @ 2.60GHz 2.61 GHz 16GB RAM <br>
Time spent: 9.1486998

::: warning
Due to the batch SQL generation, with placeholders exceeding sixty thousand, only 10,000 records can be inserted at a time.
:::