FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
CMD [ "npm", "run", "start" ]

# Install clingo
ARG CLINGO_VERSION=5.2.0
RUN curl -L "https://github.com/potassco/clingo/releases/download/v${CLINGO_VERSION}/clingo-${CLINGO_VERSION}-linux-x86_64.tar.gz" | tar -xzf -
ENV PATH /usr/src/app/clingo-${CLINGO_VERSION}-linux-x86_64:${PATH}

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app