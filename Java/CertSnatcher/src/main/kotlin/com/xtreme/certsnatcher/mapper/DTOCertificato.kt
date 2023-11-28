data class DTOCertificato(
    val nome: String,
    val formato: String,
    val byte: ByteArray,
    val pesoInKB: Double
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as DTOCertificato

        if (nome != other.nome) return false
        if (!byte.contentEquals(other.byte)) return false
        if (pesoInKB != other.pesoInKB) return false

        return true
    }

    override fun hashCode(): Int {
        var result = nome.hashCode()
        result = 31 * result + byte.contentHashCode()
        result = 31 * result + pesoInKB.hashCode()
        return result
    }
}
