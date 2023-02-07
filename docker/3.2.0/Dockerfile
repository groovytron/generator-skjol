FROM debian:bullseye

ARG PANDOC_VERSION
ARG PANDOC_CROSSREF_VERSION
ARG PANDOC_INCLUDE_CODE_VERSION

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update --quiet \
    && apt-get upgrade --quiet --yes \
    && apt-get install software-properties-common --quiet --yes \
    && apt-get install --quiet --yes \
	bash-completion \
	curl \
	fonts-inconsolata \
	fonts-linuxlibertine \
	fonts-croscore \
	fonts-crosextra-carlito \
	fonts-texgyre \
	fswatch \
	git \
	lmodern \
	locales \
	librsvg2-bin \
	make \
	tex-gyre \
	texlive-fonts-extra \
	texlive-fonts-recommended \
	texlive-lang-french \
	texlive-latex-extra \
	texlive-latex-recommended \
	texlive-science \
	texlive-xetex \
	tzdata \
	wget \
    && apt-get autoremove --quiet --yes \
    && apt-get clean

RUN wget https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-1-amd64.deb \
        --output-document pandoc.deb \
        --quiet \
    && dpkg -i pandoc.deb \
    && rm pandoc.deb

RUN wget https://github.com/lierdakil/pandoc-crossref/releases/download/v${PANDOC_CROSSREF_VERSION}/pandoc-crossref-Linux.tar.xz \
        --output-document pandoc-crossref.tar.gz \
        --quiet \
    && tar xf pandoc-crossref.tar.gz \
    && mv pandoc-crossref /usr/local/bin

RUN  wget https://github.com/owickstrom/pandoc-include-code/releases/download/v${PANDOC_INCLUDE_CODE_VERSION}/pandoc-include-code-linux-ghc8-pandoc-1-19.tar.gz \
        --output-document pandoc-include-code.tar.gz \
        --quiet \
    && tar xf pandoc-include-code.tar.gz \
    && mv pandoc-include-code /usr/local/bin

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
    apt-get install -y nodejs

# Create less privileged user
RUN groupadd --gid 1000 dev \
  && useradd --uid 1000 --gid dev --shell /bin/bash --create-home dev

# Mount your app source code directory into that folder
WORKDIR /home/dev/doc

# Add bash completion
RUN echo 'source /etc/profile.d/bash_completion.sh' >> ~/.bashrc
RUN echo 'source /etc/profile.d/bash_completion.sh' >> /home/dev/.bashrc

# Fix permissions issues
RUN chmod -R a+wrx /home/dev
RUN chmod -R a+rx /usr/local/bin/pandoc-crossref
RUN chmod -R a+rx /usr/local/bin/pandoc-include-code

USER dev
