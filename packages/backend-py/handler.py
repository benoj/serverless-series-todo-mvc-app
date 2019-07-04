import os
import json
import psycopg2


connection = psycopg2.connect(
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
)


def dump(event):
    data = {"event": event}
    return {"statusCode": 201, "body": json.dumps(data)}


def load(event):
    return json.loads(event.get("body", "{}"))


def create(event, context):
    body = load(event)
    text = body.get("text")
    completed = body.get("completed", False)
    cursor = connection.cursor()
    cursor.execute("INSERT INTO todos (text, completed) VALUES (%s, %s) RETURNING id;", (text, completed))
    record = cursor.fetchone()
    return {"statusCode": 201, "body": json.dumps({"id": record[0], "text": text, "completed": completed})}


def update(event):
    return dump(event)


def delete(event):
    return dump(event)


def list(event, context):
    cursor = connection.cursor()
    cursor.execute("SELECT id, text, completed FROM todos;")
    records = cursor.fetchall()
    return {"statusCode": 200, "body": json.dumps(records)}
