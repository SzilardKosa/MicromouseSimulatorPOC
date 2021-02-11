FROM gcc:latest

WORKDIR /usr/src

COPY build.sh .

COPY main.c app/

#RUN gcc -o myapp main.c

CMD ["./build.sh"]