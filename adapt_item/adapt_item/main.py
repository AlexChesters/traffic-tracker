import json
import pprint

def handler(event, _context = None):
    return {
        "title": event["title"],
        "road": event["road"],
        "region": event["region"],
        "county": event["county"],
        "latitude": float(event["latitude"]),
        "longitude": float(event["longitude"]),
    }

if __name__ == "__main__":
    with open("stub-data.json", "r", encoding="utf-8") as f:
        pp = pprint.PrettyPrinter(indent=2)
        pp.pprint(handler(json.load(f)["results"][0], None))
