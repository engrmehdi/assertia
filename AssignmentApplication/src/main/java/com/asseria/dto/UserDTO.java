package com.asseria.dto;

import com.asseria.entity.Country;
import com.asseria.entity.State;
import com.asseria.entity.Streat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@ApiModelProperty(value = "The unique id of a user")
	private Long id;
	@ApiModelProperty(value = "The name of the user")
	private String username;
	@ApiModelProperty(value = "The email id of the user")
	private String email;
	@ApiModelProperty(value = "The phone number of the user")
	private String phone;
	
	@ApiModelProperty(value = "The password of the user")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	@ApiModelProperty(value = "The password of the user")
	private String confirmPassword;
	
	@ApiModelProperty(value = "The streat of the user")
	private Streat streat;

	@ApiModelProperty(value = "The country of the user")
	private Country country;

	@ApiModelProperty(value = "The state of the user")
	private State state;

	@ApiModelProperty(value = "The state of the user")
	private String createdBy;
	@ApiModelProperty(value = "The state of the user")
	private Date creationDate;
	@ApiModelProperty(value = "The state of the user")
	private String lastModifiedBy;
	@ApiModelProperty(value = "The state of the user")
	private Date lastModifiedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public Streat getStreat() {
		return streat;
	}

	public void setStreat(Streat streat) {
		this.streat = streat;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	@Override
	public String toString() {
		return "UserDTO{" +
				"id=" + id +
				", username='" + username + '\'' +
				", email='" + email + '\'' +
				", phone='" + phone + '\'' +
				", password='" + password + '\'' +
				", confirmPassword='" + confirmPassword + '\'' +
				", streat=" + streat +
				", country=" + country +
				", state=" + state +
				", createdBy='" + createdBy + '\'' +
				", creationDate=" + creationDate +
				", lastModifiedBy='" + lastModifiedBy + '\'' +
				", lastModifiedDate=" + lastModifiedDate +
				'}';
	}
}
