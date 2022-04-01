import json
import datetime

import feedparser

def handler(_event = None, _context = None):
    feed = feedparser.parse("https://m.highwaysengland.co.uk/feeds/rss/UnplannedEvents.xml")
    return {
        "timestamp": datetime.datetime.utcnow().replace(microsecond=0).isoformat(),
        "results": feed["entries"]
    }

if __name__ == "__main__":
    result = handler({}, None)
    with open("../adapt_item/stub-data.json", "w", encoding="utf-8") as f:
        json.dump(result, f)
    print(result)
