# 使用Go发送ping命令-icmp协议

```go
package main

import (
    "fmt"
    "golang.org/x/net/icmp" // Import for ICMP functionality
    "golang.org/x/net/ipv4"   // Import for ICMPv4 types
    "net"                     // Import for network operations
    "time"                     // Import for timeouts
)

const (
    target  = "www.baidu.com" // Target host to ping
    timeOut = time.Second * 4  // Timeout duration for waiting for response
)

func main() {
    // Listen on port 0 (any available) for incoming ICMP packets
    conn, err := icmp.ListenPacket("ip4:icmp", "0.0.0.0")
    if err != nil {
        panic("Failed to listen for ICMP packets:" + err.Error())
    }
    defer conn.Close() // Close the connection when the function exits

    // Create an ICMP echo request message
    msg := icmp.Message{
        Type: ipv4.ICMPTypeEcho, // Message type: Echo Request
        Code: 0,                 // ICMP code (usually 0)
        Body: &icmp.Echo{
            ID:   12345, // Identifier for this echo request
            Seq:  1,     // Sequence number (usually 1 for the first request)
            Data: []byte("HELLO-R-U-THERE"), // Custom payload data
        },
    }

    // Encode the ICMP message into a byte slice
    msgBytes, err := msg.Marshal(nil)
    if err != nil {
        panic("Failed to marshal ICMP message:" + err.Error())
    }

    // Resolve the target hostname to an IP address
    ip, err := net.ResolveIPAddr("ip4", target)
    if err != nil {
        panic("Failed to resolve target hostname:" + err.Error())
    }

    // Send the ICMP echo request to the target IP address
    _, err = conn.WriteTo(msgBytes, ip)
    if err != nil {
        panic("Failed to write ICMP message:" + err.Error())
    }

    // Set a deadline for receiving a response
    conn.SetReadDeadline(time.Now().Add(timeOut))

    // Allocate a buffer to store the received reply
    reply := make([]byte, 1024)

    // Read from the connection, waiting for a response with a timeout
    n, peer, err := conn.ReadFrom(reply)
    if err != nil {
        // Handle different error types (e.g., timeout vs. other errors)
        if err == net.ErrDeadlineExceeded {
            fmt.Println("Ping timed out.")
        } else {
            panic("Failed to read ICMP response:" + err.Error())
        }
        return
    }

    // Decode the received bytes into an ICMP message
    message, err := icmp.ParseMessage(1, reply[0:n])
    if err != nil {
        panic("Failed to parse ICMP reply:" + err.Error())
    }

    // Print information about the received response
    fmt.Printf("Received unexpected reply from %v: %+v\n", peer, message)

    // Extract the payload data from the ICMP message body
    marshal, err := message.Body.Marshal(1)
    if err != nil {
        panic("Failed to marshal ICMP reply payload:" + err.Error())
    }

    // Print the payload data as a string
    fmt.Println(string(marshal))
}

```