package com.xtreme.certsnatcher.mapper

import DTOCertificato

data class DTOResponse(
    val status: String,
    val messaggio: String,
    var dominio : String,
    val certificato: DTOCertificato
)
