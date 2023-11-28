package com.xtreme.certsnatcher

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CertsnatcherApplication

fun main(args: Array<String>) {
	runApplication<CertsnatcherApplication>(*args)
}
