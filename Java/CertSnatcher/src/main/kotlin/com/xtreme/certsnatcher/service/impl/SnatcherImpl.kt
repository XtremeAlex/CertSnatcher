package com.xtreme.certsnatcher.service.impl

import DTOCertificato
import com.xtreme.certsnatcher.service.ISnatcher
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.math.BigDecimal
import java.math.RoundingMode
import java.net.URL
import java.security.KeyStore
import java.security.cert.CertificateFactory
import java.security.cert.X509Certificate
import java.util.*
import javax.net.ssl.HttpsURLConnection

@Service
class SnatcherImpl : ISnatcher {

    override fun catturaCertificato(dominio: String): DTOCertificato {
        val x509Cert = ottieniCertificatoX509DaDominio(dominio)
        val pemCert = convertiInFormatoPem(x509Cert)
        val pesoInKB = BigDecimal(pemCert.toByteArray().size / 1024.0).setScale(2, RoundingMode.UP).toDouble()

        return DTOCertificato(
            nome = getCommonName(x509Cert.subjectX500Principal.name) ?: "Unknown",
            formato = ".pem",
            byte = pemCert.toByteArray(),
            pesoInKB = pesoInKB
        )
    }

    fun ottieniCertificatoX509DaDominio(dominio: String): X509Certificate {
        val url = URL("https://$dominio")
        val connection = url.openConnection() as HttpsURLConnection
        connection.connect()

        val certs = connection.serverCertificates
        return certs[0] as X509Certificate
    }

    fun getCommonName(dn: String): String? {
        return dn.split(",").firstOrNull { it.trim().startsWith("CN=") }?.substringAfter("CN=")
    }

    private fun convertiInFormatoPem(cert: X509Certificate): String {
        val encoder = Base64.getMimeEncoder(64, "\n".toByteArray())
        val certEncoded = encoder.encodeToString(cert.encoded)
        return "-----BEGIN CERTIFICATE-----\n$certEncoded\n-----END CERTIFICATE-----"
    }

    override fun creaJavaKeyStore(dominio: String, password: String): DTOCertificato {
        val x509Cert = ottieniCertificatoX509DaDominio(dominio)
        val ks = KeyStore.getInstance("JKS")
        ks.load(null, password.toCharArray())
        ks.setCertificateEntry(getCommonName(x509Cert.subjectX500Principal.name) ?: "Unknown", x509Cert)

        val baos = ByteArrayOutputStream()
        ks.store(baos, password.toCharArray())

        val pesoInKB = BigDecimal(baos.toByteArray().size / 1024.0).setScale(2, RoundingMode.UP).toDouble()

        return DTOCertificato(
            nome = getCommonName(x509Cert.subjectX500Principal.name) ?: "Unknown",
            formato = ".jks",
            byte = baos.toByteArray(),
            pesoInKB = pesoInKB
        )
    }

}
