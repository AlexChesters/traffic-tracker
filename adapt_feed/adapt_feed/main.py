import json

def handler(event, _context = None):
    print(event["road"])
    return event

if __name__ == "__main__":
    with open("stub-data.json", "r", encoding="utf-8") as f:
        print(handler(json.load(f)[0], None))
