package demo.java.config;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import graphql.GraphQLContext;
import graphql.execution.CoercedVariables;
import graphql.language.StringValue;
import graphql.language.Value;
import graphql.schema.Coercing;
import graphql.schema.CoercingParseLiteralException;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;
import graphql.schema.GraphQLScalarType;

@Configuration
public class ScalarConfig {
    public static final GraphQLScalarType DateScalar = GraphQLScalarType.newScalar()
            .name("Date")
            .description("Date custom scalar type")
            .coercing(new Coercing() {
                @Override
                public Object serialize(Object dataFetcherResult, GraphQLContext graphQLContext, Locale locale)
                        throws CoercingSerializeException {
                    try {
                        Instant publishedTime = (Instant) dataFetcherResult;
                        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE.withZone(ZoneId.systemDefault());
                        return formatter.format(publishedTime);
                    } catch (CoercingSerializeException exception) {
                        throw new CoercingSerializeException("Invalid Input:" + exception.getMessage());
                    }
                }

                @Override
                public Object parseValue(Object input, GraphQLContext graphQLContext,
                        Locale locale) throws CoercingParseValueException {
                    try {
                        return LocalDate.parse((String) input).atStartOfDay(ZoneId.systemDefault()).toInstant();
                    } catch (RuntimeException exception) {
                        throw new CoercingParseValueException("Invalid Input:" + exception.getMessage());
                    }
                }

                @Override
                public Object parseLiteral(Value input, CoercedVariables variables,
                        GraphQLContext graphQLContext, Locale locale)
                        throws CoercingParseLiteralException {
                    try {
                        StringValue stringValue = (StringValue) input;
                        LocalDate date = LocalDate.parse(stringValue.getValue());
                        return date.atStartOfDay(ZoneId.systemDefault()).toInstant();
                    } catch (RuntimeException exception) {
                        throw new CoercingParseLiteralException("Invalid Input:" + exception.getMessage());
                    }
                }
            })
            .build();

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return builder -> builder.scalar(DateScalar);
    }
}
