package com.asseria.AOP;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAdvice {

    Logger log = LoggerFactory.getLogger(LoggingAdvice.class);
    @Pointcut(value = "execution(* com.asseria.*.*.*(..))")
    public void applicationPointCut(){

    }

    @Around("applicationPointCut()")
    public Object applicationLogger(ProceedingJoinPoint pjp) throws Throwable {

        try{
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS , false);
            String method = pjp.getSignature().getName();
            String className = pjp.getTarget().getClass().toString();
            Object[] arguments = pjp.getArgs();
            log.info( " method :" + method + " class:"+ className + " arguments:" + mapper.writeValueAsString(arguments));
            Object response = pjp.proceed();
            log.info( " method :" + method + " class:"+ className + " response:" + mapper.writeValueAsString(response));

            return response;


        }catch (Throwable e){
            log.error("Illegal argument: {} in {}.{}()", Arrays.toString(pjp.getArgs()),
                    pjp.getSignature().getDeclaringTypeName(), pjp.getSignature().getName());
            throw e;
        }

    }

    @AfterThrowing(pointcut = "applicationPointCut()", throwing = "e")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable e) {
        log.error("Exception in {}.{}() with cause = {}", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), e.getStackTrace());
    }

}