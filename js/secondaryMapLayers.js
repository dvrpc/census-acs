const secondaryLayers = {
    countyOutline: {
        "id": "county-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            "line-width": 2.5,
            "line-color": "#505a5e"
        },
        "filter": [
            "==",
            "dvrpc",
            "Yes"
        ]
    },
    countyHover: {
        "id": "county-hover",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            "line-width": 3.5,
            "line-color": "#0074ad"
        },
        "filter": [
            "==",
            "geoid",
            ""
          ]
    },
    countyFill: {
        "id": "county-fill",
        "type": "fill",
        "source": "boundaries",
        "source-layer": "county",
        "layout": {},
        "paint": {
            "fill-color": "rgba(0,0,0,0)",
            "fill-opacity": 0
        }
    },
    tractOutline: {
        "id": "tract-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "tracts",
        "paint": {
            "line-width": 1,
            "line-color": "#4a5c64"
        }
    },
    tractFill: {
        "id": "tract-fill",
        "type": "fill",
        "source": "boundaries",
        "source-layer": "tracts",
        "layout": {},
        "paint": {
            "fill-color": "rgba(0,0,0,0)",
            "fill-opacity": 0
        }
    },
    tractHover: {
        "id": "tract-hover",
        "type": "line",
        "source": "boundaries",
        "source-layer": "tracts",
        "paint": {
            "line-width": 2,
            "line-color": "#0074ad"
        },
        "filter": [
            "==",
            "geoid",
            ""
          ]
    },
    blockOutline: {
        "id": "block-outline",
        "type": "line",
        "source": "census",
        "source-layer": "blocks",
        "paint": {
            "line-width": 1,
            "line-color": "#4a5c64"
        },
        "filter": [
            "==",
            "DVRPC",
            "Yes"
        ]
    },
    blockFill: {
        "id": "block-fill",
        "type": "fill",
        "source": "census",
        "source-layer": "blocks",
        "layout": {},
        "paint": {
            "fill-color": "rgba(0,0,0,0)",
            "fill-opacity": 0
        }
    },
    blockHover: {
        "id": "block-hover",
        "type": "line",
        "source": "census",
        "source-layer": "blocks",
        "paint": {
            "line-width": 2,
            "line-color": "#0074ad"
        },
        "filter": [
            "==",
            "GEOID10",
            ""
          ]
    }
}

export default secondaryLayers