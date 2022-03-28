import feedparser

def handler(event = {}, context = {}):
    feed = feedparser.parse("https://m.highwaysengland.co.uk/feeds/rss/AllEvents.xml")
    print(feed["entries"][0])

if __name__ == "__main__":
    print(handler({}, None))
