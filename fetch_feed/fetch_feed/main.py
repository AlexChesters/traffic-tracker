import feedparser

def handler(_event = None, _context = None):
    feed = feedparser.parse("https://m.highwaysengland.co.uk/feeds/rss/AllEvents.xml")
    return feed["entries"]

if __name__ == "__main__":
    print(handler({}, None))
