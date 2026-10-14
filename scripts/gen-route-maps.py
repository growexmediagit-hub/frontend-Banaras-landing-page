"""Generate the itinerary route maps (src/data/maps/*.ts) from Natural Earth 10m GeoJSON.

Download into <ne_dir> from https://github.com/nvkelso/natural-earth-vector/tree/master/geojson:
  ne_10m_admin_0_countries, ne_10m_admin_1_states_provinces, ne_10m_rivers_lake_centerlines
Usage: python3 scripts/gen-route-maps.py <ne_dir> src/data/maps"""
import json, math, sys, os

NE, OUT = sys.argv[1], sys.argv[2]
W = 480

def load(name):
    return json.load(open(os.path.join(NE, name + ".geojson")))["features"]

countries = load("ne_10m_admin_0_countries")
states = load("ne_10m_admin_1_states_provinces")
rivers = load("ne_10m_rivers_lake_centerlines")

def polys(geom):
    if geom["type"] == "Polygon":
        return [geom["coordinates"]]
    if geom["type"] == "MultiPolygon":
        return geom["coordinates"]
    return []

def lines(geom):
    if geom["type"] == "LineString":
        return [geom["coordinates"]]
    if geom["type"] == "MultiLineString":
        return geom["coordinates"]
    return []

class Proj:
    def __init__(self, lon0, lon1, lat0, lat1):
        self.lon0, self.lat1 = lon0, lat1
        c = math.cos(math.radians((lat0 + lat1) / 2))
        self.c = c
        self.k = W / ((lon1 - lon0) * c)
        self.H = round((lat1 - lat0) * self.k)
    def __call__(self, lon, lat):
        return ((lon - self.lon0) * self.c * self.k, (self.lat1 - lat) * self.k)

def clip_poly(pts, xmin, ymin, xmax, ymax):
    def clip(pts, inside, inter):
        out = []
        for i in range(len(pts)):
            cur, prev = pts[i], pts[i - 1]
            if inside(cur):
                if not inside(prev):
                    out.append(inter(prev, cur))
                out.append(cur)
            elif inside(prev):
                out.append(inter(prev, cur))
        return out
    def ix(x):
        return lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]))
    def iy(y):
        return lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y)
    for inside, inter in [
        (lambda p: p[0] >= xmin, ix(xmin)), (lambda p: p[0] <= xmax, ix(xmax)),
        (lambda p: p[1] >= ymin, iy(ymin)), (lambda p: p[1] <= ymax, iy(ymax)),
    ]:
        if not pts:
            return []
        pts = clip(pts, inside, inter)
    return pts

def thin(pts, tol=0.7):
    out = []
    for p in pts:
        if not out or math.hypot(p[0] - out[-1][0], p[1] - out[-1][1]) >= tol:
            out.append(p)
    return out

def fmt(pts, close):
    s = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts)
    return s + ("Z" if close else "")

def area_d(proj, geoms, pad=12):
    H = proj.H
    parts = []
    for g in geoms:
        for poly in polys(g):
            for ring in poly:
                pts = [proj(x, y) for x, y in ring]
                pts = clip_poly(pts, -pad, -pad, W + pad, H + pad)
                pts = thin(pts)
                if len(pts) >= 3:
                    parts.append(fmt(pts, True))
    return "".join(parts)

def outline_d(proj, geoms, pad=12):
    """Polygon rings as open lines, split where they leave the frame (for borders)."""
    H = proj.H
    parts = []
    for g in geoms:
        for poly in polys(g):
            for ring in poly:
                parts += line_runs([proj(x, y) for x, y in ring], H, pad)
    return "".join(parts)

def line_runs(pts, H, pad=12):
    runs, cur = [], []
    for p in pts:
        if -pad <= p[0] <= W + pad and -pad <= p[1] <= H + pad:
            cur.append(p)
        else:
            if len(cur) > 1:
                runs.append(cur)
            cur = []
    if len(cur) > 1:
        runs.append(cur)
    return [fmt(thin(r), False) for r in runs if len(thin(r)) > 1]

def river_d(proj, names):
    parts = []
    for f in rivers:
        n = f["properties"].get("name")
        if n in names and f["geometry"]:
            for ln in lines(f["geometry"]):
                parts += line_runs([proj(x, y) for x, y in ln], proj.H)
    return "".join(parts)

def curve(a, b, bend):
    """Quadratic curve from a to b, bowed sideways by `bend` × distance."""
    mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    dx, dy = b[0] - a[0], b[1] - a[1]
    cx, cy = mx - dy * bend, my + dx * bend
    return f"M{a[0]:.1f} {a[1]:.1f} Q{cx:.1f} {cy:.1f} {b[0]:.1f} {b[1]:.1f}"

def cubic(a, b, c1, c2):
    return f"M{a[0]:.1f} {a[1]:.1f} C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {b[0]:.1f} {b[1]:.1f}"

def r1(v):
    return round(v, 1)

def build(name, bbox, land_filter, region_filter, border_filter, river_names, places, legs, labels, icons):
    proj = Proj(*bbox)
    land = [f["geometry"] for f in countries if land_filter(f["properties"])]
    data = {"width": W, "height": proj.H, "land": area_d(proj, land)}
    if region_filter:
        data["region"] = area_d(proj, [f["geometry"] for f in states if region_filter(f["properties"])])
    if border_filter:
        data["borders"] = outline_d(proj, [f["geometry"] for f in states if border_filter(f["properties"])])
    data["rivers"] = river_d(proj, river_names)
    pts = {}
    stops = []
    for p in places:
        x, y = proj(p["lon"], p["lat"])
        pts[p["name"]] = (x, y)
        s = {k: v for k, v in p.items() if k not in ("lon", "lat")}
        s["x"], s["y"] = r1(x), r1(y)
        stops.append(s)
    data["stops"] = stops
    at = lambda v: pts[v] if isinstance(v, str) else proj(*v)  # stop name or raw (lon, lat)
    # bend: a number bows a quadratic sideways; a pair of (lon, lat) control points gives a cubic.
    data["legs"] = [
        {"d": cubic(at(a), at(b), proj(*bend[0]), proj(*bend[1])) if isinstance(bend, list) else curve(at(a), at(b), bend), "mode": mode}
        for a, b, bend, mode in legs
    ]
    data["labels"] = [dict(l, **dict(zip(("x", "y"), map(r1, proj(l.pop("lon"), l.pop("lat")))))) for l in labels]
    data["icons"] = [dict(kind=k, **dict(zip(("x", "y"), map(r1, proj(lon, lat))))) for k, lon, lat in icons]
    body = json.dumps(data, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, name + ".ts"), "w") as fh:
        fh.write(
            "// Generated from Natural Earth 10m data (public domain) — coastline, borders and rivers\n"
            "// projected to SVG coordinates by scripts/gen-route-maps.py — regenerate rather than hand-edit.\n"
            'import type { RouteMap } from "../landing";\n\n'
            f"export const {name}Map: RouteMap = {body};\n"
        )
    print(name, "H", proj.H, "bytes", len(body))

build(
    "thailand",
    (99.4, 102.1, 12.45, 14.1),
    lambda p: p.get("ADM0_A3") in ("THA", "KHM"),
    None,
    None,
    {"Chao Phraya"},
    [
        {"name": "Bangkok", "lon": 100.50, "lat": 13.75, "start": True, "anchor": "end", "dx": -12, "dy": 5},
        {"name": "Pattaya", "lon": 100.88, "lat": 12.93, "anchor": "start", "dx": 12, "dy": 5},
        {"name": "Coral Island", "lon": 100.78, "lat": 12.92, "anchor": "end", "dx": -9, "dy": -7, "minor": True},
    ],
    [((101.3, 14.25), "Bangkok", 0.15, "flight"), ("Bangkok", "Pattaya", [(101.02, 13.7), (101.1, 13.12)], "road"), ("Pattaya", "Bangkok", [(101.24, 13.05), (101.2, 13.75)], "road"), ("Pattaya", "Coral Island", 0.9, "boat"), ("Coral Island", "Pattaya", 0.9, "boat")],
    [
        {"text": "Gulf of Thailand", "kind": "sea", "lon": 100.2, "lat": 12.72},
        {"text": "THAILAND", "kind": "region", "lon": 101.5, "lat": 13.55},
        {"text": "Chao Phraya", "kind": "river", "lon": 100.3, "lat": 14.02},
    ],
    [("plane", 101.0, 14.03), ("boat", 100.8, 12.76)],
)

build(
    "banaras",
    (80.2, 84.65, 24.65, 27.15),
    lambda p: p.get("ADM0_A3") in ("IND", "NPL"),
    lambda p: p.get("name") == "Uttar Pradesh",
    lambda p: p.get("adm0_a3") == "IND",
    {"Ganges", "Yamuna", "Ghäghara"},
    [
        {"name": "Varanasi", "lon": 82.97, "lat": 25.32, "start": True, "anchor": "start", "dx": 12, "dy": 16},
        {"name": "Prayagraj", "lon": 81.85, "lat": 25.44, "anchor": "end", "dx": -12, "dy": 18, "note": "Triveni Sangam"},
        {"name": "Ayodhya", "lon": 82.20, "lat": 26.80, "anchor": "start", "dx": 12, "dy": 5, "note": "Ram Mandir"},
        {"name": "Sarnath", "lon": 83.02, "lat": 25.38, "anchor": "start", "dx": 10, "dy": -6, "minor": True},
    ],
    [("Varanasi", "Prayagraj", 0.18, "road"), ("Prayagraj", "Ayodhya", 0.2, "road")],
    [
        {"text": "UTTAR PRADESH", "kind": "region", "lon": 81.5, "lat": 26.3},
        {"text": "Ganga", "kind": "river", "lon": 82.55, "lat": 25.18},
        {"text": "BIHAR", "kind": "region", "lon": 84.0, "lat": 25.4},
    ],
    [],
)
