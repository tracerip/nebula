#!/usr/bin/env python3
import json
from pathlib import Path
from datetime import datetime

BASE_URL = "https://trylearning.space"
PROJECT_ROOT = Path(__file__).parent.parent

def load_index(folder: str) -> list:
    index_path = PROJECT_ROOT / folder / "index.json"
    if not index_path.exists():
        print(f"⚠️  {index_path} not found")
        return []
    with open(index_path, "r", encoding="utf-8") as f:
        return json.load(f)

def generate_sitemap():
    urls = []
    today = datetime.now().strftime("%Y-%m-%d")

    urls.append({"loc": BASE_URL, "priority": "1.0", "changefreq": "daily"})

    games = load_index("g")
    for item in games:
        urls.append({
            "loc": f"{BASE_URL}/?u={item['id']}",
            "priority": "0.8",
            "changefreq": "weekly"
        })
        print(f"🎮 {item['title']}: {BASE_URL}/?u={item['id']}")

    apps = load_index("a")
    for item in apps:
        urls.append({
            "loc": f"{BASE_URL}/?u={item['id']}",
            "priority": "0.8",
            "changefreq": "weekly"
        })
        print(f"📱 {item['title']}: {BASE_URL}/?u={item['id']}")

    categories = load_index("c")
    for item in categories:
        urls.append({
            "loc": f"{BASE_URL}/?c={item['id']}",
            "priority": "0.6",
            "changefreq": "weekly"
        })
        print(f"📂 {item['title']}: {BASE_URL}/?c={item['id']}")

    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for url in urls:
        xml_content += "  <url>\n"
        xml_content += f"    <loc>{url['loc']}</loc>\n"
        xml_content += f"    <lastmod>{today}</lastmod>\n"
        xml_content += f"    <changefreq>{url['changefreq']}</changefreq>\n"
        xml_content += f"    <priority>{url['priority']}</priority>\n"
        xml_content += "  </url>\n"
    
    xml_content += "</urlset>\n"

    output_path = PROJECT_ROOT / "sitemap.xml"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(xml_content)
    
    print(f"\n✅ Generated {len(games)} game URLs")
    print(f"✅ Generated {len(apps)} app URLs")
    print(f"✅ Generated {len(categories)} category URLs")
    print(f"📄 Sitemap saved to: {output_path}")

if __name__ == "__main__":
    generate_sitemap()
