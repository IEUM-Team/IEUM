package com.craypas.bottle.model.dto.response;

import java.util.List;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class DetailReqBottleDto {
	private Long id;
	private String content;
	private Integer type;
	private Integer sentiment;
	private String regTime;
	private Integer status;
	private List<CheckedResBottleDto> resBottles;

	@QueryProjection
	public DetailReqBottleDto(long id, String content, int type, int sentiment, String regTime, int status, List<CheckedResBottleDto> resBottles) {
		this.id = id;
		this.content = content;
		this.type = type;
		this.sentiment = sentiment;
		this.regTime = regTime;
		this.status = status;
		this.resBottles = resBottles;
	}
}