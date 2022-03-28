import feedparser

def handler(*_):
    feed = feedparser.parse("http://m.highwaysengland.co.uk/feeds/rss/AllEvents.xml")
    print(feed["entries"][0])

if __name__ == "__main__":
    print(handler({}, None))
