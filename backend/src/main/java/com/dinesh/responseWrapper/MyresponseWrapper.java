package com.dinesh.responseWrapper;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class MyresponseWrapper {
	private String message;
	private Object data;
}
