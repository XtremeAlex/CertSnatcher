package com.xtreme.certsnatcher.service

import DTOCertificato
import org.springframework.stereotype.Service
import java.security.cert.Certificate


interface ISnatcher {

    fun catturaCertificato(dominio: String): DTOCertificato
    fun creaJavaKeyStore(dominio: String, password: String): DTOCertificato
}
