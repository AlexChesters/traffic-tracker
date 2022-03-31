import json

import feedparser

def handler(_event = None, _context = None):
    feed = feedparser.parse("https://m.highwaysengland.co.uk/feeds/rss/UnplannedEvents.xml")
    return feed["entries"]

if __name__ == "__main__":
    result = handler({}, None)
    with open("../adapt_item/stub-data.json", "w", encoding="utf-8") as f:
        json.dump(result, f)
    print(result)
