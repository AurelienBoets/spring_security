package com.example.springsecurity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BaseResponseDto {

    private Object message;
    private Object data;


    public BaseResponseDto(Object message) {
        this.message = message;
    }
}
