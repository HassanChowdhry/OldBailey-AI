
FROM python:3.12-alpine
RUN apk update
RUN apk add py-pip
RUN apk add --no-cache python3-dev 
RUN pip install --upgrade pip

COPY ./requirements.txt /src/requirements.txt

WORKDIR /src

COPY . /src

RUN pip --no-cache-dir install -r requirements.txt
CMD ["python3", "run.py"]