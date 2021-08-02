package com.asseria.entity;

import com.asseria.Auditing.Auditable;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "streat")
//@Audited
public class Streat extends Auditable<String> implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
