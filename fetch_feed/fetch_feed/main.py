def handler(event, _):
    print(f"event {event}")

if __name__ == '__main__':
    print(handler({}, None))
