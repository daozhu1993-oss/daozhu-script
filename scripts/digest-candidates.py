"""List recent, unpublished source leads for the daily editor (stdout JSON)."""
import concurrent.futures
import datetime as dt
from email.utils import parsedate_to_datetime
import json
from pathlib import Path
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET

SOURCES = {
    "AIbase": "https://www.aibase.com/zh/news",
    "量子位": "https://www.qbitai.com/feed",
    "AWN": "https://www.awn.com/rss.xml",
    "Animation Magazine": "https://www.animationmagazine.net/feed/",
    "befores & afters": "https://beforesandafters.com/feed/",
    "CineD": "https://www.cined.com/feed/",
}
SHANGHAI = dt.timezone(dt.timedelta(hours=8))
NOW = dt.datetime.now(dt.timezone.utc)
SINCE = NOW - dt.timedelta(hours=72)


def aibase_items(body):
    # These are the site's dated Next.js article records, including the numeric article ID.
    for payload in re.findall(r'self\.__next_f\.push\((\[.*?\])\)</script>', body.decode(), re.S):
        data = json.loads(payload)
        if len(data) < 2 or not isinstance(data[1], str):
            continue
        for match in re.finditer(r'\{"Id":\d+,"title":', data[1]):
            obj, _ = json.JSONDecoder().raw_decode(data[1][match.start():])
            published = dt.datetime.fromisoformat(obj["addtime"]).replace(tzinfo=SHANGHAI)
            yield published, obj["title"], f'https://www.aibase.com/zh/news/{obj["Id"]}'


def fetch(source):
    url = SOURCES[source]
    req = urllib.request.Request(url, headers={"User-Agent": "Daozhu Script Digest/1.0 (+https://script.daozhuai.cn/)"})
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            body = resp.read(8_000_001)
        if len(body) > 8_000_000:
            raise ValueError("响应过大")
        if source == "AIbase":
            rows = list(aibase_items(body))
        else:
            rows = [(parsedate_to_datetime(i.findtext("pubDate")), i.findtext("title"), i.findtext("link"))
                    for i in ET.fromstring(body).findall("./channel/item")
                    if i.findtext("pubDate") and i.findtext("title") and i.findtext("link")]
        if not rows:
            raise ValueError("未解析到带日期的条目")
        return {"source": source, "read": len(rows), "leads": [
            {"published": date.isoformat(), "title": title.strip(), "url": link.strip()}
            for date, title, link in rows if SINCE <= date <= NOW and link.strip().rstrip("/") not in used
        ]}
    except Exception as exc:
        return {"source": source, "error": str(exc), "leads": []}


if __name__ == "__main__":
    directory = Path(__file__).resolve().parents[1] / "src/data/digest"
    used = {item["url"].rstrip("/") for path in directory.glob("*.json")
            for item in json.loads(path.read_text())["items"]}
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(fetch, SOURCES))
    print(json.dumps(results, ensure_ascii=False, indent=2))
    sys.exit(int(all("error" in result for result in results)))
