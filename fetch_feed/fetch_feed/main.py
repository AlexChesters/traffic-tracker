import feedparser

def handler(event, _context = None):
    feed = feedparser.parse("https://m.highwaysengland.co.uk/feeds/rss/UnplannedEvents.xml")
    return feed["entries"]

if __name__ == "__main__":
    print(handler({}, None))
