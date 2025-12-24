+++
title = "How to serve CNN models with Fast API"
slug = "how-to-serve-cnn-models-with-fast-api"
date = "2025-03-05"
description = "Blog about serving CNN models with Fast API"
+++

![cnn-with-fast-api](../assets/cnn-with-fast-api.webp "CNN with Fast API")

Tags: #programming, #python

Recently I have run into an issue with a client who asked me to build a CNN model for certain task. Let's keep "why" a secret and let's talk about why I am writing this blog.
The issue that we ran into later on was, my client was not ready to use the sagemaker for deploying the model even though we trained it on sagemaker. He wanted a custom repo where we could track the files and have our own custom inference.
On top of that he wanted `Fast API`

### So, Why fast API?

I don't want to write a full page of elaboration on why fast API and why not others. To keep it simple, the client just wanted it on Fast API. His reasons being:

- It was easier to learn, so if in future anyone else wants to modify something they can quickly make changes
- It was fast
- Has satisfactory performance

I am pretty sure, you already know somewhat ins and out of all the frameworks and already thinking why this guy is talking BS over showing us actual code. As a developer I think that is what would come to your mind so I will just start writing things which you came for.

### Basically we will follow these rules

- we will keep it simple
- we will write as much less code as possible
- and the code should just do the job as POC to test

### The Code

```python
from tensorflow.keras.models import load_model
import pickle
import numpy as np
from loguru import logger

logger.debug("Loading model...")
model = load_model("model-artifacts/model.keras")
logger.debug("Model loaded successfully!")

logger.debug("Loading vectorizer...")
with open("model-artifacts/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)
logger.debug("Vectorizer loaded successfully!")

logger.debug("Loading label encoder...")
with open("model-artifacts/label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)
logger.debug("Label encoder loaded successfully!")


def preprocess_query(queries):
    """
    Pre-process the queries, vectorize them and reshape for model
    :return Returns vectors
    """
    query_vectors = vectorizer.transform(queries).toarray()
    query_vectors = query_vectors.reshape(
        query_vectors.shape[0], query_vectors.shape[1], 1
    )  # Reshape for Conv1D
    return query_vectors


@logger.catch
def get_predictions(queries):
    """
    Process the queries which are in list and return the results after inferencing the model
    :return list of {'query', 'category', 'probability'} after inferencing
    """
    query_vectors = preprocess_query(queries)

    predicted_probs = model.predict(query_vectors)
    predicted_indices = predicted_probs.argmax(axis=1)
    max_probs = predicted_probs.max(axis=1)
    max_probs = np.atleast_1d(max_probs)
    predicted_category = label_encoder.inverse_transform(predicted_indices)
    results = [
        {
            "query": query,
            "category": category,
            "probability": round(float(probability), 4),
        }
        for query, category, probability in zip(queries, predicted_category, max_probs)
    ]

    return results
```

filename: `inference.py`

#### Elaboration

Basically three things are happening here:

1. We are loading all the artifacts
2. We are defining pre-processor function to process our queries
3. We are predicting and returning results

We are loading the model, label_encoder and vectorizer on the first few steps. You can use pickle or joblib, it's up to your choice. I like pickle so I went with it.
After that our main method is `get_predictions` where we will take the queries list and then pre-process it, predict the results with the model and return the results while `preprocess_query` acts as a method which will act as a separate method just to pre-process anything on the queries list to have a separation of concern.

Then we have:

```python
import uvicorn
from fastapi import FastAPI
from inference import get_predictions
from loguru import logger
from pydantic import BaseModel

title = "CNN Model API"
description = "A simple API to load and predict with CNN model in fast API"

# Initiate app instance
app = FastAPI(title=title, version="1.0", description=description)


class IncomingData(BaseModel):
    queries: list


# Initiate logging
log_format = "{time} | {level} | {message} | {file} | {line} | {function} | {exception}"
logger.add(
    sink="app/data/log_files/logs.log",
    format=log_format,
    level="DEBUG",
    compression="zip",
)


# Api root or health endpoint
@app.get("/")
@app.get("/health")
def read_home():
    """
    Health endpoint which can be used to test the availability of the application.
    :return: Dict with key 'message' and value
    """
    logger.debug("User checked the root page")
    return {"message": f"{title} - live!"}


# Prediction endpoint
@app.post("/predict")
@logger.catch()  # catch any unexpected breaks
def get_predictions_from_model(incoming_data: IncomingData):
    """
    Prediction endpoint to process the raw queries and pass them to model for inferencing and return the results
    :return List with predicted category and props
    """
    data = incoming_data.model_dump()
    if data["queries"]:
        queries_parsed = data["queries"]
        logger.info(f"User sent queries for predictions are: {queries_parsed}")

        preds = get_predictions(queries_parsed)
        logger.debug("Predictions successfully generated for the user")

        return preds
    return "No queries found"


if __name__ == "__main__":
    # Run app with uvicorn with port and host specified. Host needed for docker port mapping
    uvicorn.run(app, port=8000, host="0.0.0.0")
```

filename: main.py

#### Elaboration

Here is our `main.py` file, where will be using the previous inference code and handle our API requests. I am using FastAPI app and uvicorn web server to handle the requests.
Also, not to mention another advantage of fast API is out of the box documentation support.
So, we have two methods:
`/health` which we will be using to check the health of the API
`/predict` for predictions

---

the `get_predictions_from_model` method handles the incoming request where it will take the incoming queries and pass it onto the prediction function to get the predictions
I am using `loguru` for logging but you can go for any other loggers of your choice.
This should have a minimal API for us to deploy the model. I have written few comments on the code itself so that I don't have to elaborate each and everything on the blog as I am not trying to write a detailed blog.

### I want to use docker

So, if you want to use docker? That is also covered.
Below is the dockerfile that I am using for it. I have used tensorflow image rather than python base image because it is PITA to install tensorflow via pip as it is slower than my 90 year old grandma

```Dockerfile
FROM tensorflow/tensorflow:2.17.0-gpu

WORKDIR /app

RUN apt-get update && apt-get install -y \
  git \
  wget \
  unzip \
  && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p app/data/log_files && touch app/data/log_files/logs.logs
RUN mkdir -p app/model-artifacts

EXPOSE 8000

CMD ["python", "main.py"]
```

Don't forget to write all the required packages you need on the `requirements.txt` file before you proceed. You don't need to worry about anything else.

Other than that, if you want to find the full repo, you can checkout the repo on:

[CNN - FastAPI repo](https://github.com/zaffron/cnn-fastapi)

Have fun!
