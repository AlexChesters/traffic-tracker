import json

def handler(event, _context = None):
    data = event[0]
    print(data["road"])

if __name__ == "__main__":
    with open("stub-data.json", "r", encoding="utf-8") as f:
        print(handler(json.load(f), None))
