variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "name_prefix" {
  type    = string
  default = "docker-epicbook"
}

variable "ami_id" {
  type    = string
  default = "ami-05e86b3611c60b0b4"
}

variable "instance_type" {
  type    = string
  default = "t3.small"
}

variable "key_name" {
  type    = string
  default = "windows-keyrsa"
}

variable "vpc_id" {
  type    = string
  default = "vpc-001d44de0e03615d3"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0de5a7836e219cc04"
}

variable "allowed_ssh_cidr" {
  type    = string
  default = "0.0.0.0/0"
}

variable "allowed_http_cidr" {
  type    = string
  default = "0.0.0.0/0"
}

variable "private_key_path" {
  type    = string
  default = "/home/paul/.ssh/windows-keyrsa.pem"
}

variable "ssh_user" {
  type    = string
  default = "ubuntu"
}
