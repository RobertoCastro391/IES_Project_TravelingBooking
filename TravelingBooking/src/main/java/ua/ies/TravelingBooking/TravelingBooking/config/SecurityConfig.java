package ua.ies.TravelingBooking.TravelingBooking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationProvider;
import ua.ies.TravelingBooking.TravelingBooking.Jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenciationFilter;
    private final AuthenticationProvider authProvider;
   
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authRequest ->
                authRequest
                    .requestMatchers("/api/flights/airports").permitAll()
                    .requestMatchers("/api/flights/airlines").permitAll()
                    .requestMatchers("/api/flights/searchFlight").permitAll()
                    .requestMatchers("/api/hotels/searchHotels").permitAll()
                    .requestMatchers("/api/museums/**").permitAll()
                    .requestMatchers("/api/trains/stations").permitAll()
                    .requestMatchers("/api/trains/trainCompanies").permitAll()
                    .requestMatchers("/api/trains/searchTrain").permitAll()
                    .requestMatchers("/api/user/register").permitAll()
                    .requestMatchers("/api/user/login").permitAll()
                    .anyRequest().authenticated()
            )
            .sessionManagement(sessionManagement ->
                sessionManagement
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authProvider)
            .addFilterBefore(jwtAuthenciationFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}