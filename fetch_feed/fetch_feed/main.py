import feedparser
import json

def handler(event, _context = None):
    feed = feedparser.parse("https://m.highwaysengland.co.uk/feeds/rss/UnplannedEvents.xml")
    return feed["entries"]

if __name__ == "__main__":
    result = handler({}, None)
    with open("../adapt_feed/stub-data.json", "w") as f:
        json.dump(result, f)
    print(result)
