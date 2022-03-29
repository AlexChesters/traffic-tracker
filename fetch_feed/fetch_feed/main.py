import feedparser

def handler(event, _context = None):
    try:
        if event["type"] == "unplanned":
            url = "https://m.highwaysengland.co.uk/feeds/rss/UnplannedEvents.xml"
        elif event["type"] == "planned":
            url = "https://m.highwaysengland.co.uk/feeds/rss/CurrentAndFutureEvents.xml"
        else:
            raise ValueError("unrecognised type received")
    except KeyError as ex:
        raise ValueError("no type provided") from ex

    feed = feedparser.parse(url)
    return feed["entries"]

if __name__ == "__main__":
    print(handler({"type": "unplanned"}, None))
