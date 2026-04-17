output "instance_id" {
  value = aws_instance.docker_epicbook.id
}

output "public_ip" {
  value = aws_instance.docker_epicbook.public_ip
}

output "public_dns" {
  value = aws_instance.docker_epicbook.public_dns
}

output "security_group_id" {
  value = aws_security_group.docker_epicbook.id
}
