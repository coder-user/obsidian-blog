# Go 禁用默认 15s 的 tcp 层保活

> [net: default TCP Keep-Alive interval causes significant power usage · Issue #48622 · golang/go (github.com)](https://github.com/golang/go/issues/48622)
> [net: more detailed TCP keep-alive configuration · Issue #62254 · golang/go (github.com)](https://github.com/golang/go/issues/62254) 

上述的提案也有修改。

在 Go 语言中，如果您想禁用默认的 15 秒 TCP 服务保活时间，您可以通过设置 TCP 连接的 Socket 选项来实现。这通常涉及到创建一个 TCP 监听器，然后对每个接受的连接进行配置。以下是一个简单的示例代码，展示了如何禁用 TCP 保活时间：

```go
package main

import (
    "net"
    "time"
)

func main() {
    // 创建TCP监听器
    ln, err := net.Listen("tcp", ":8080")
    if err != nil {
        // 处理错误
    }

    for {
        // 接受连接
        conn, err := ln.Accept()
        if err != nil {
            // 处理错误
            continue
        }

        // 设置TCP保活选项
        tcpConn, ok := conn.(*net.TCPConn)
        if ok {
            // 禁用TCP保活
            tcpConn.SetKeepAlive(false)
        }

        // 处理连接（例如，启动一个goroutine）
        go handleConnection(conn)
    }
}

func handleConnection(conn net.Conn) {
    // 这里处理连接
    defer conn.Close()

    // ... 连接处理代码 ...
}
```

在这个示例中，首先创建了一个 TCP 监听器，然后对于每个接受的连接，我们将其转换为 `*net.TCPConn` 类型（如果可能的话），并调用 `SetKeepAlive(false)` 来禁用 TCP 保活功能。这样，TCP 连接就不会使用默认的 15秒保活间隔了。