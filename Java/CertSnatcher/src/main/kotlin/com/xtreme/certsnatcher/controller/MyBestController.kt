package com.xtreme.certsnatcher.controller;

import com.xtreme.certsnatcher.mapper.DTORequest
import com.xtreme.certsnatcher.mapper.DTOResponse
import com.xtreme.certsnatcher.service.ISnatcher
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
class MyBestController (val interfaceSnatcher: ISnatcher) : BaseController() {

    private val logger = LoggerFactory.getLogger(MyBestController::class.java)

    @GetMapping("/isAlive" , "/")
    @ResponseBody
    fun isAlive(): String {
        return """
            <html>
            <head>
                <title>Pagina Esempio</title>
                <style>
                    body {
                        background-color: black;
                        color: white;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div>
                <h1>CertSnatcher<h1>
                <h2>LIVE!<h2>
                </div>
            </body>
            </html>
        """.trimIndent()
    }

    @PostMapping("/getPEMByDominio")
    fun getCertificatoByDominio(@RequestBody richiesta: DTORequest): DTOResponse {
        val dominio = richiesta.dominio;
        logger.info("getCertificatoByDominio del dominio: $dominio")

        val certificato = interfaceSnatcher.catturaCertificato(dominio)

        // PER TEST
        //val certificato = DTOCertificato("Example CN", byteArrayOf(), 0.1)

        return DTOResponse("Success", "Operazione completata", dominio, certificato)
    }

    @PostMapping("/downloadPEMByDominio")
    fun downloadCertificatoByDominio(@RequestBody richiesta: DTORequest): ResponseEntity<ByteArray> {
        val dominio = richiesta.dominio;
        logger.info("downloadCertificatoByDominio del dominio: $dominio")

        val certificato = interfaceSnatcher.catturaCertificato(dominio)

        val respHeaders = HttpHeaders().apply {
            contentType = MediaType.parseMediaType("application/x-pem-file")
            setContentDispositionFormData("attachment", "$dominio.pem")
        }

        return ResponseEntity(certificato.byte, respHeaders, HttpStatus.OK)
    }


    @PostMapping("/downloadJKSByDominio")
    fun downloadCertificatoJks(@RequestBody richiesta: DTORequest): Any {
        val dominio = richiesta.dominio;
        logger.info("downloadCertificatoJks del dominio: $dominio")

        val jksFile = interfaceSnatcher.creaJavaKeyStore(dominio, "certsnatcher")

        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_OCTET_STREAM
            setContentDispositionFormData("attachment", "$dominio.jks")
        }

        return ResponseEntity(jksFile.byte, headers, HttpStatus.OK)
    }

    @PostMapping("/getJKSByDominio")
    fun getCertificatoJks(@RequestBody richiesta: DTORequest): DTOResponse {
        val dominio = richiesta.dominio;
        logger.info("getCertificatoJks del dominio: $dominio")

        val certificato = interfaceSnatcher.creaJavaKeyStore(dominio, "certsnatcher")

        return DTOResponse("Success", "Operazione completata", dominio, certificato)
    }
}
