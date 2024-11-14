package main

import (
	"net"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

func apiKeyMiddleware(c *gin.Context) {
	apiKey := c.GetHeader("apikey")

	if apiKey == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Cadê a Chave API?"})
		c.Abort()
		return
	}

	expectedAPIKey := "c5192078-316f-40df-90e0-23a3c2f7ed5b"

	if apiKey != expectedAPIKey {
		c.JSON(http.StatusForbidden, gin.H{"error": "Cadê a Chave API?"})
		c.Abort()
		return
	}

	c.Next()
}

func clientIPMiddleware(c *gin.Context) {
	var clientIP string

	xForwardedFor := c.GetHeader("X-Forwarded-For")

	// Check if X-Forwarded-For header exists and contains exactly one IP
	if xForwardedFor != "" && !strings.Contains(xForwardedFor, ",") {
		ip := strings.TrimSpace(xForwardedFor)

		// Validate that ip is a valid IP address
		if net.ParseIP(ip) != nil {
			clientIP = ip
		} else {
			// If invalid IP, fallback to c.ClientIP()
			clientIP = c.ClientIP()
		}
	} else {
		clientIP = c.ClientIP()
	}

	// Store clientIP in context for use in handlers
	c.Set("clientIP", clientIP)

	c.Next()
}

func internalIPMiddleware(c *gin.Context) {
	xForwardedFor := c.GetHeader("X-Forwarded-For")

	if xForwardedFor != "127.0.0.1" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden"})
		c.Abort()
		return
	}

	c.Next()
}

func main() {
	router := gin.Default()

	// Public routes returning 200 OK without content
	router.GET("/home", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	router.GET("/me", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	router.GET("/help", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	router.GET("/status", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	router.GET("/easteregg", func(c *gin.Context) {
		c.Redirect(http.StatusFound, "https://youtube.com/watch?v=CdaPhpGG6As")
	})

	// Debug route returning JSON with apiKey and flag
	router.GET("/debug", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"apiKey": "c5192078-316f-40df-90e0-23a3c2f7ed5b",
			"flag":   "TAC{GetYourKey:b550bed920bf51ddfa0e7fd5e3cbe7846409889625861de6407825727ed14590}",
		})
	})

	// Protected /auth route with client IP handling
	router.GET("/auth", apiKeyMiddleware, clientIPMiddleware, func(c *gin.Context) {
		// Retrieve clientIP from context
		clientIPInterface, exists := c.Get("clientIP")
		if !exists {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Client IP not found"})
			return
		}

		clientIP, ok := clientIPInterface.(string)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid client IP"})
			return
		}

		if clientIP == "127.0.0.1" {
			c.JSON(http.StatusOK, gin.H{
				"message":     "Bem Vindo usuário de IP: " + clientIP,
				"localização": "Esta é área autenticada interna, segredos podem estar próximos... Siga para /auth/internal/parte1",
				"flag":        "TAC{ExternalArea:178596985a70e8444d8a05ed4cab977c0283d122a8e4c511485e299cce04615d}",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message":     "Bem Vindo usuário de IP: " + clientIP,
			"localização": "Esta é área autenticada externa",
		})
	})

	router.GET("/auth/internal/parte1", apiKeyMiddleware, internalIPMiddleware, func(c *gin.Context) {
		filePath := filepath.Join("files", "parte1.pdf")
		c.FileAttachment(filePath, "parte1.pdf")
	})

	router.GET("/auth/internal/20b01b554b404a849d686ea4a56fdc6e", apiKeyMiddleware, internalIPMiddleware, func(c *gin.Context) {
		filePath := filepath.Join("files", "parte2.pdf")
		c.FileAttachment(filePath, "parte2.pdf")
	})

	router.GET("/auth/internal/3c34cb6be588417dabbf3701d6b76817", apiKeyMiddleware, internalIPMiddleware, func(c *gin.Context) {
		filePath := filepath.Join("files", "parte3.pdf")
		c.FileAttachment(filePath, "parte3.pdf")
	})

	router.Run(":8088")
}
