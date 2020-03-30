def foo(event, context):
    return "Hello " + event["data"]["user"] + "!"