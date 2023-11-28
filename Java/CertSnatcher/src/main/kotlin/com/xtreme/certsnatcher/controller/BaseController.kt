package com.xtreme.certsnatcher.controller

import org.springframework.web.bind.annotation.GetMapping


open class BaseController {

    @GetMapping("*")
    fun error404(): String {
        val html = """
        <html>
            <head>
                <title>Pagina Esempio</title>
                <style>
                    body {
                        background-color: black;
                        color: red;
                        font-family: 'Courier New', Courier, monospace;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        text-align: center;
                    }

                    .glitch {
                        position: relative;
                        color: red;
                        overflow: hidden;
                    }

                    .glitch::before, .glitch::after {
                        content: attr(data-text);
                        position: absolute;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        background-color: black;
                        color: white;
                        overflow: hidden;
                        clip: rect(0, 900px, 0, 0);
                        animation: glitch 0.1s infinite linear alternate-reverse;
                    }

                    .glitch::after {
                        left: 2px;
                        text-shadow: -1px 0 red;
                        animation-delay: 0.05s;
                    }

                    @keyframes glitch {
                        0% {
                            clip: rect(24px, 900px, 28px, 0);
                        }
                        10% {
                            clip: rect(48px, 900px, 52px, 0);
                        }
                        20% {
                            clip: rect(74px, 900px, 78px, 0);
                        }
                        30% {
                            clip: rect(98px, 900px, 102px, 0);
                        }
                        40% {
                            clip: rect(122px, 900px, 126px, 0);
                        }
                        50% {
                            clip: rect(146px, 900px, 150px, 0);
                        }
                        60% {
                            clip: rect(170px, 900px, 174px, 0);
                        }
                        70% {
                            clip: rect(194px, 900px, 198px, 0);
                        }
                        80% {
                            clip: rect(218px, 900px, 222px, 0);
                        }
                        90% {
                            clip: rect(242px, 900px, 246px, 0);
                        }
                        100% {
                            clip: rect(266px, 900px, 270px, 0);
                        }
                    }

                    .glitch-black {
                        color: black;
                        transition: color 0.5s;
                    }
                </style>
            </head>
            <body>
                <div class="glitch" data-text="Pagina non trovata">
                    <h1>{{ "Errore 404: Pagina non trovata" }}</h1>
                    <p>La pagina che stai cercando non esiste.</p>
                </div>
            </body>
        </html>
    """.trimIndent()

        return html
    }

}
