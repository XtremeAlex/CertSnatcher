package com.xtreme.certsnatcher.conf

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport

@Configuration
@EnableWebMvc
class MyMvcConfig : WebMvcConfigurationSupport(){


    @Value("\${app.version}")
    private val version: String? = null

    @Value("\${app.name}")
    private val name: String? = null

    @Value("\${app.description}")
    private val description: String? = null

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("swagger-ui.html")
            .addResourceLocations("classpath:/META-INF/resources/")
        registry.addResourceHandler("/webjars/**")
            .addResourceLocations("classpath:/META-INF/resources/webjars/")
        if (!registry.hasMappingForPattern("/resources/**")) {
            registry.addResourceHandler("/resources/**")
                .addResourceLocations("classpath:/static/")
        }
    }

    @Bean
    fun usersMicroserviceOpenAPI(): OpenAPI? {
        return OpenAPI()
            .info(
                Info()
                    .title(name)
                    .description(description)
                    .version(version)
            )
    }

}
