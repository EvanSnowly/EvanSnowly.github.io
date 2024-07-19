# 缓存系统

使用 Go 实现的并发安全缓存内存系统

## 接口定义

```go
package cache

import "time"

// Cache is an interface that defines the methods for an in-memory cache system.
type Cache interface {
	// SetMaxMemory sets the maximum allowed memory size for the cache.
	// size: a string representing the maximum memory size, e.g., "10MB".
	// Returns true if the size was set successfully, false otherwise.
	SetMaxMemory(size string) bool

	// Set adds a key-value pair to the cache with an expiration duration.
	// key: the key under which the value will be stored.
	// value: the value to store in the cache.
	// expire: the duration after which the key-value pair will expire.
	// Returns true if the value was set successfully, false otherwise (e.g., if it exceeds max memory).
	Set(key string, value any, expire time.Duration) bool

	// Get retrieves a value from the cache by its key.
	// key: the key to look up in the cache.
	// Returns the value associated with the key and a boolean indicating whether the key was found.
	Get(key string) (any, bool)

	// Delete removes a key-value pair from the cache.
	// key: the key to remove from the cache.
	// Returns true if the key was deleted successfully, false otherwise.
	Delete(key string) bool

	// Exists checks if a key is present in the cache.
	// key: the key to check for existence in the cache.
	// Returns true if the key exists, false otherwise.
	Exists(key string) bool

	// Flush clears all entries in the cache.
	// Returns true if the cache was cleared successfully, false otherwise.
	Flush() bool

	// KeyNum returns the number of keys currently in the cache.
	// Returns the number of keys as an int64.
	KeyNum() int64
}
```

## 结构体实现

### 初始化

```go
// MemoryCache is a struct that represents an in-memory cache with a fixed maximum size.
type MemoryCache struct {
	maxMemorySize     int64             // Maximum allowed memory size for the cache
	maxMemoryString   string            // Human-readable string representation of the maximum memory size
	currentMemorySize int64             // Current memory usage of the cache
	cacheMap          map[string]*Value // The underlying map to store cache values
	locker            sync.RWMutex      // Read-write mutex for safe concurrent access
	clearTime         time.Duration     // Interval for clearing expired cache entries
}

// Value represents a cached value with an expiration time and size.
type Value struct {
	value  any       // The actual value stored in the cache
	expire time.Time // Expiration time of the cached value
	size   int64     // Size of the cached value in bytes
}

// NewMemoryCache initializes a new MemoryCache with default settings.
func NewMemoryCache() *MemoryCache {
	m := &MemoryCache{
		cacheMap:  make(map[string]*Value, 100), // Initialize the cache map with a capacity of 100
		clearTime: time.Second * 1,              // Set the default clear interval to 1 second
	}
	go m.clearExpireCache(m.clearTime) // Start a goroutine to clear expired cache entries periodically
	return m
}

```

### 基本操作

对于映射分配，有两种情况：删除和添加。在每种情况下重新计算当前占用的大小。所有更改操作都基于以下两种方法：

```go
// deleteKey removes a key from the cache and adjusts the current memory size.
func (m *MemoryCache) deleteKey(key string) bool {
	value, ok := m.cacheMap[key]
	if value != nil && ok {
		delete(m.cacheMap, key)
		m.currentMemorySize -= value.size
		return true
	}
	return false
}

// addKey adds a new key-value pair to the cache and updates the current memory size.
func (m *MemoryCache) addKey(key string, value *Value) {
	m.cacheMap[key] = value
	m.currentMemorySize += value.size
}
```

### SetMaxMemory

Set the maximum memory: The ParseSize function returns the default memory of 100MB if it fails to parse.

```go
// SetMaxMemory sets the maximum allowed memory size for the cache.
func (m *MemoryCache) SetMaxMemory(size string) bool {
	var err error
	m.maxMemorySize, m.maxMemoryString, err = ParseSize(size)
	if err != nil {
		return false
	}
	return true
}
```

### 设置最大内存

设置最大内存：如果解析失败，ParseSize 函数返回默认内存 100MB。

```go
// SetMaxMemory sets the maximum allowed memory size for the cache.
func (m *MemoryCache) SetMaxMemory(size string) bool {
	var err error
	m.maxMemorySize, m.maxMemoryString, err = ParseSize(size)
	if err != nil {
		return false
	}
	return true
}
```

### 设置

```go
// Set adds a key-value pair to the cache with an expiration duration.
func (m *MemoryCache) Set(key string, value any, expire time.Duration) bool {
	m.locker.Lock()
	defer m.locker.Unlock()
	v := &Value{
		value:  value,
		expire: time.Now().Add(expire),
		size:   int64(SizeOfVariable(value)),
	}
	if v.size+m.currentMemorySize > m.maxMemorySize {
		log.Printf("超出内存限制, 当前对象使用内存 %d bytes, 最大内存 %d bytes", v.size, m.maxMemorySize)
		return false
	}
	m.deleteKey(key)
	m.addKey(key, v)
	return true
}
```

### 获取

检查是否过期：使用给定的时间进行轮询并释放内存。
Check for expiration: Poll using the given time and release memory.

```go
// Get retrieves a value from the cache by its key.
func (m *MemoryCache) Get(key string) (any, bool) {
	m.locker.Lock()
	defer m.locker.Unlock()
	value, ok := m.cacheMap[key]
	if !ok {
		return nil, false
	}
	if value.expire.Before(time.Now()) {
		m.deleteKey(key)
		return nil, false
	}
	return value, true
}
```

### 删除

```go
// Delete removes a key-value pair from the cache.
func (m *MemoryCache) Delete(key string) bool {
	m.locker.Lock()
	defer m.locker.Unlock()
	return m.deleteKey(key)
}
```

### 存在性检查

```go
// Exists checks if a key is present in the cache.
func (m *MemoryCache) Exists(key string) bool {
	m.locker.Lock()
	defer m.locker.Unlock()
	_, ok := m.cacheMap[key]
	return ok
}
```

### 清除缓存

```go
// Flush clears all entries in the cache.
func (m *MemoryCache) Flush() bool {
	m.locker.Lock()
	defer m.locker.Unlock()
	m.cacheMap = make(map[string]*Value, 100)
	m.currentMemorySize = 0
	return true
}
```

### 获取键数量

```go
// KeyNum returns the number of keys currently in the cache.
func (m *MemoryCache) KeyNum() int64 {
	m.locker.Lock()
	defer m.locker.Unlock()
	return int64(len(m.cacheMap))
}

```

### 清除过期缓存

使用给定的时间进行轮询并释放内存。

```go
// clearExpireCache periodically removes expired entries from the cache.
func (m *MemoryCache) clearExpireCache(dr time.Duration) {
	ticker := time.NewTicker(dr)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			for key, value := range m.cacheMap {
				if value.expire.Before(time.Now()) {
					m.locker.Lock()
					m.deleteKey(key)
					m.locker.Unlock()
				}
			}

		}
	}
}
```

## 实用函数

### 常量

```go
const (
	B = 1 << (iota * 10)
	KB
	MB
	GB
	TB
)
```

### 解析大小

此函数将输入大小从字符串转换为字节值。

```go
const (
	B = 1 << (iota * 10)
	KB
	MB
	GB
	TB
)
```

### parseSize

This function converts the input size from a string to a byte value.

```go
func ParseSize(size string) (int64, string, error) {
	var n, u string
	for _, value := range size {
		if unicode.IsDigit(value) {
			n += string(value)
		} else if unicode.IsLetter(value) {
			u += string(value)
		}
	}
	u = strings.ToUpper(u)
	dn, err := strconv.ParseInt(n, 10, 64)
	if err != nil {
		log.Println("The unit is wrong, and the default setting is 100 megabytes")
		return 100, "100MB", err
	}
	var bs int64 = 0
	switch u {
	case "B":
		bs = dn
	case "KB":
		bs = dn * KB
	case "MB":
		bs = dn * MB
	case "GB":
		bs = dn * GB
	case "TB":
		bs = dn * TB
	default:
		log.Println("The unit is wrong, and the default setting is 100 megabytes")
		return 100, "100MB", err
	}

	return bs, n + u, nil
}
```

### 计算大小

```go
// SizeOfVariable Returns the memory size of a variable (in bytes)
func SizeOfVariable(v any) uintptr {
	val := reflect.ValueOf(v)
	return calculateSize(val)
}

// calculateSize Recursively calculate the memory size of a variable
func calculateSize(val reflect.Value) uintptr {
	switch val.Kind() {
	case reflect.String:
		return uintptr(val.Len())
	case reflect.Slice:
		var size uintptr
		for i := 0; i < val.Len(); i++ {
			size += calculateSize(val.Index(i))
		}
		return size
	case reflect.Array:
		var size uintptr
		for i := 0; i < val.Len(); i++ {
			size += calculateSize(val.Index(i))
		}
		return size
	case reflect.Map:
		var size uintptr
		for _, key := range val.MapKeys() {
			size += calculateSize(key)
			size += calculateSize(val.MapIndex(key))
		}
		return size
	case reflect.Ptr, reflect.Interface:
		if val.IsNil() {
			return 0
		}
		return calculateSize(val.Elem())
	case reflect.Struct:
		var size uintptr
		for i := 0; i < val.NumField(); i++ {
			size += calculateSize(val.Field(i))
		}
		return size
	default:
		return uintptr(unsafe.Sizeof(val.Interface()))
	}
}
```
