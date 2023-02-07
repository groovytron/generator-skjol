variable "LATEST" {
  default = "3.2.0"
}

variable "IMAGE_NAME" {
  default = "skjol" 
}

variable "AUTHOR" {
  default = "groovytron"
}

variable "IMAGE_URL" {
  default = "docker.io/${AUTHOR}/${IMAGE_NAME}"
}

group "default" {
  targets = ["skjol"]
}

target "skjol" {
  dockerfile = "docker/${LATEST}/Dockerfile"
  tags = [
    "${IMAGE_URL}:3.2.0",
    "${IMAGE_URL}:${LATEST}"
  ]
  args = {
    PANDOC_VERSION = "3.0.1"
    PANDOC_CROSSREF_VERSION = "0.3.15.0"
    PANDOC_INCLUDE_CODE_VERSION = "1.2.0.2"
  }
}
