KROKI_HOST_URL=http://kroki:8000
#  KROKI_HOST_URL=http://localhost:8000

BUILDDIR=build

IMAGEDIR=diagrams

ERD=erd
ERD_DIR=$(IMAGEDIR)/$(ERD)
ERD_BUILDDIR=$(BUILDDIR)/$(ERD_DIR)
ERD_SOURCES=$(wildcard $(ERD_DIR)/*.$(ERD))
ERD_SVG=$(patsubst $(ERD_DIR)/%.$(ERD),$(ERD_BUILDDIR)/%.svg,$(ERD_SOURCES))

MERMAID=mmd
MERMAID_DIR=$(IMAGEDIR)/mermaid
MERMAID_BUILDDIR=$(BUILDDIR)/$(MERMAID_DIR)
MERMAID_SOURCES=$(wildcard $(MERMAID_DIR)/*.$(MERMAID))
MERMAID_SVG=$(patsubst $(MERMAID_DIR)/%.$(MERMAID),$(MERMAID_BUILDDIR)/%.svg,$(MERMAID_SOURCES))

NOMNOML=nomnoml
NOMNOML_DIR=$(IMAGEDIR)/$(NOMNOML)
NOMNOML_BUILDDIR=$(BUILDDIR)/$(NOMNOML_DIR)
NOMNOML_SOURCES=$(wildcard $(NOMNOML_DIR)/*.$(NOMNOML))
NOMNOML_SVG=$(patsubst $(NOMNOML_DIR)/%.$(NOMNOML),$(NOMNOML_BUILDDIR)/%.svg,$(NOMNOML_SOURCES))

PLANTUML=puml
PLANTUML_DIR=$(IMAGEDIR)/plantuml
PLANTUML_BUILDDIR=$(BUILDDIR)/$(PLANTUML_DIR)
PLANTUML_SOURCES=$(wildcard $(PLANTUML_DIR)/*.$(PLANTUML))
PLANTUML_SVG=$(patsubst $(PLANTUML_DIR)/%.$(PLANTUML),$(PLANTUML_BUILDDIR)/%.svg,$(PLANTUML_SOURCES))

BUILD=$(BUILDDIR) $(ERD_BUILDDIR) $(MERMAID_BUILDDIR) $(NOMNOML_BUILDDIR) $(PLANTUML_BUILDDIR)

CURL_ARGS=--silent

SVG=$(ERD_SVG) $(MERMAID_SVG) $(NOMNOML_SVG) $(PLANTUML_SVG)
PDF=report.pdf

ALL=$(SVG) $(PDF)

.PHONY:all
all: $(ALL)

.PHONY:svg
svg: $(SVG)

.PHONY:up
up:
	docker-compose up

.PHONY:clean
clean:
	rm -rf $(BUILD)

.PHONY:watch
watch:
	while true; do \
		make all; \
		inotifywait --exclude '($(BUILDDIR)|.git)' -qre close_write .; \
	done

report.pdf: report.md $(SVG)
	pandoc $< \
		--standalone \
		--from markdown+smart \
		--to latex \
		--pdf-engine xelatex \
		--filter pandoc-crossref \
		--filter pandoc-citeproc \
		 --filter pandoc-include-code \
		--variable documentclass=scrreprt \
		--variable mainfont="Linux Libertine O" \
		--variable sansfont="Linux Biolinum O" \
		--variable monofont="Inconsolata" \
		--output $(BUILDDIR)/$@

$(BUILD):
	mkdir -p $@

$(ERD_BUILDDIR)/%.svg: $(ERD_DIR)/%.$(ERD) $(ERD_BUILDDIR)
	curl $(CURL_ARGS) $(KROKI_HOST_URL)/$(ERD)/svg --data-binary '@$<' > $@

$(MERMAID_BUILDDIR)/%.svg: $(MERMAID_DIR)/%.$(MERMAID) $(MERMAID_BUILDDIR)
	curl $(CURL_ARGS) $(KROKI_HOST_URL)/mermaid/svg --data-binary '@$<' > $@

$(NOMNOML_BUILDDIR)/%.svg: $(NOMNOML_DIR)/%.$(NOMNOML) $(NOMNOML_BUILDDIR)
	curl $(CURL_ARGS) $(KROKI_HOST_URL)/$(NOMNOML)/svg --data-binary '@$<' > $@

$(PLANTUML_BUILDDIR)/%.svg: $(PLANTUML_DIR)/%.$(PLANTUML) $(PLANTUML_BUILDDIR)
	curl $(CURL_ARGS) $(KROKI_HOST_URL)/c4plantuml/svg --data-binary '@$<' > $@
	sed -i 's/>Warning:</></g' $@
	sed -i 's/>Created for discussion, needs to be validated</></g' $@
